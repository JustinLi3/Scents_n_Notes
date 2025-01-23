#Essentially a translator that takes your prompt and reformats for LangChain to better understand to process better
from langchain.adapters.openai import convert_openai_messages
#Allow us to interact with LLMS
from langchain_openai import ChatOpenAI
from tavily import TavilyClient
from dotenv import load_dotenv

import os 
#load in environment variables (delete during during production)
load_dotenv()

#Initialize Tavily client
client = TavilyClient(api_key=os.environ.get('TAVILY_API_KEY')) 



def fragrance_recommender(userPreferences):  
    # Define the query to retrieve data from Tavily 
    query = "Given the user's preferences as follows: " + userPreferences + ", list the top 5 bestselling fragrances that match these preferences. Please return only the names of the fragrances, separated by a '/' (e.g., fragrance1/fragrance2/fragrance3/fragrance4/fragrance5), without additional text or explanations."

    #Fetch search results, top 3 relevant sources
    response = client.search(query, max_results= 3, search_depth="basic")['results']
    #LangChain Prompt (Query To Process Data): 

    prompt = [
        #Define the AI's job description
        {
            'role':'system', 
            'content': f''' 
            "You are an AI critical thinker research assistant." 
            "Your purpose is to help recommend the user's bestselling fragrances based on the provided information."
            '''
    },
        #Give Specific instructions for the current task based on the input data
        {
            'role': 'user', 
            'content': f"""Information: {response}
            \nUsing the information above, answer the following query:\n{query}. 
            """
        }
    ]
    
    #Convert prompt for LangChain processing

    lc_messages = convert_openai_messages(prompt)


    #gpt-40-mini for hybrid performance and efficiency
    response = ChatOpenAI(model='gpt-4o-mini').invoke(lc_messages) 
    print(response)

    #The query tells Tavily what to search for based on relevance, and the prompt tells the OpenAI model its role and how to use Tavily's response (information) to solve the query.
    return response.content.split('/')

