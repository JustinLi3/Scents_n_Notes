def adjacent_counts(words):   
    results = [0 for _ in words]
    for index in range(len(words)):  
        temp = 0 
        for index2 in range(len(words[index])-1): 
            if(words[index][index2+1] == words[index][index2]): 
                temp+=1 
            results[index] = temp
    return results
if __name__ =="__main__":
    strings = ["hello", "aabbcc", "mississippi", "noon", "bookkeeper", "banana", "apple", "cabbage", "level", "racecar"]
    print(adjacent_counts(strings))