from django.core.paginator import Paginator

posts = list(range(1,6)) #dummy number of total posts 
p = Paginator(posts,2) #number of posts per page 
p.num_pages #number of pages 2, 2, 1 = 3 

for page in p.page_range:
    print(page)

#accessing each page 
p1 = p.page(1)

#list of posts within 
p1.object_list 

#check for previous or next 
p1.has_previous() #return false since theres nothing prior to first page 
p1.has_next()