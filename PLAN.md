# Thought process and work plan

1. Read through repository documentation and get a good understanding of structure.
1. Investergate API capabilities.
    1. Should it/could it split/paginate?
    1. Angular 7 virtual scroll?
1. Determine need for image compression?
1. Bootstrap Angular in project and migrate configuration
    1. Router for deeplinking to filter?
1. ngBootstrap and scss.
1. Implement list with data.
1. Find inspiration on how to theme. Perhaps some list / gallery view on dgi.dk
1. Theme the list.
1. Filtering. How many cameras and Rovers?
    1. Buttons to filter?
    1. Dropdown?
    1. click property inline to filter?

## Findings

### 2. Investergate API capabilities

https://api.nasa.gov/api.html#MarsPhotos

* Paging is available. 25 photos pr page.
* The DEMO_KEY is rather limited so a developer key was requested. **wDNtDMPJKuFGxxoO5h3OuYikDua1dIn7Tu32rxLM**

```https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY``` 

Curiousity is a rover. Since it's part of the URI, it's not possible to fetch photos from all rovers at once. The other rovers are Opportunity and Spirit.

### 3. API Performance
Infinite scroll or pager? The paging option is available. 


### 10. Filters
There's two rovers with 5 cameras and 1 rover with 7 cameras.
Going with button filters.
Look at the rovers mission manifests. It has lists of available cameras.

As examplified in the task defintion we limit __sol__ (Martian rotations) to 1000 for each query. I have no idea how long time these rovers have been trucking that facinating planet.