def count_triplets(a,d): 
    result = 0
    for x in range(len(a)):
        for y in range(x+1,len(a)):
            for z in range(y+1, len(a)): 
                if(a[x]+a[y]+a[z])%d == 0:  
                    print(x,y,z)
                    result+=1 
    return result 

if __name__ == "__main__":
    a = [3, 5, 4, 2, 1, 6, 6] 
    d = 6 
    print(count_triplets(a,d))