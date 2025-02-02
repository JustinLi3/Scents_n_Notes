from langchain_community.adapters.openai import convert_openai_messages
from langchain_openai import ChatOpenAI
from tavily import TavilyClient
import logging 
from django.conf import settings


# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Initialize Tavily client
client = TavilyClient(api_key=settings.TAVILY_API_KEY) 

def ensure_five_recommendations(recommendations):
    while len(recommendations) < 5:
        recommendations.append("No additional recommendations available")
    return recommendations[:5]

def fragrance_recommender(userPreferences):  
    # Define the query to retrieve data from Tavily  
    query = (
        f"List the top 5 bestselling fragrances matching: {userPreferences}. Return the names in this format: 'Fragrance1/Fragrance2/Fragrance3/Fragrance4/Fragrance5' without any numbers or extra text."
    )

    # Fetch search results, return an empty string if not found, this avoids errors
    response = client.search(query, max_results=3, search_depth="advanced", topic="general").get('results', [])
    if not response:
        return ["No recommendations available"]

    # Log response for debugging
    logging.debug(f"Tavily Response: {response}")

    # Define the LangChain prompt
    prompt = [
        {
            'role': 'system',
            'content': (
                "You are a research assistant AI specialized in recommending fragrances. "
                "Based on the provided data, generate the top 5 bestselling fragrances."
            )
        },
        {
            'role': 'user',
            'content': f"Data: {response}\nQuery: {query}"
        }
    ]

    # Log prompt for debugging
    logging.debug(f"LangChain Prompt: {prompt}")

    try:
        # Invoke the OpenAI model
        lc_messages = convert_openai_messages(prompt)
        response = ChatOpenAI(model='gpt-4o-mini').invoke(lc_messages)

        # Process the response and ensure 5 recommendations
        recommendations = response.content.split('/')
        return ensure_five_recommendations(recommendations)
    except Exception as e:
        # Handle errors gracefully
        logging.error(f"Error during recommendation: {str(e)}")
        return [f"Error occurred: {str(e)}"]
