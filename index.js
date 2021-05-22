const puppeteer = require('puppeteer');
let _browser ; // default is true
let gtab;

puppeteer.launch({ headless: false ,
    defaultViewport: null,
    args:['--start-maximized' ],
    //slowMo: 250
})
.then(browser=>{_browser = browser})
.then(()=>{
    page = _browser.newPage();
    return page;
})
.then(function(page){
    let pageWillBeVisitedPromise = page.goto('https://shiksha.com');
    gtab = page;
    return pageWillBeVisitedPromise;
})
.then(function(){
    let waitingForSelectorPromise = waitAndClick('a[action = "login"]');
    return waitingForSelectorPromise;
})
.then(function(){
    let typeEmailIdPromise = waitAndType('input[type="email" i]',"authornjnikhil@gmail.com");
    return typeEmailIdPromise;
})
.then(function(){
    let passwordTypePromise = waitAndType('input[type="password"]',"NAKENAKE")
    return passwordTypePromise;
})
.then(function(){
    let logInButtonWillClickedPromise = waitAndClick('button.primary');
    return logInButtonWillClickedPromise;
})
.then(function(){
    let waitPromise = gtab.waitForTimeout(2000);
    return waitPromise;
})
.then(function(){
    let clickPromise = waitAndClick('div.pwadesktop-srchbox');
    return clickPromise;
})
.then(function(){
    let makeSearchQuery = waitAndType('#searchInput',"IIT DELHI HYDERABAD");
    return makeSearchQuery;
})
.then(function(){
    let clickSearch = waitAndClick('#tabIndex2');
    return clickSearch;
})
.then(function(){
    return gtab.evaluate
})
// .then(function(){
//     let query = "IIT DELHI";
//     let makeQuery = "";
    
//     query = query.split(" ");
//     makeQuery = "https://www.shiksha.com/search?q="+query[0];

//     for(let i = 1;i<query.length;i++){
//         makeQuery += "%20"+query[i];
//     }
//     makeQuery += "&rf=searchWidget";
//     let promise = gtab.goto(makeQuery);
//     return promise;
// })
.catch(function(err){
    console.log(err);
})
// .then(function(){
//     let passwordTypePromise = waitAndType('#searchInput',"IIT");
//     return passwordTypePromise;
// })


function waitAndClick(selector){
    //Returning a promise object . Promise object takes a function in constructor which got invoked as soon
    //as soon as object is created . Inside that function , a new promise is returned , which when fulfilled
    //then .then() function is called which call another promise ("selectorClickPromise") and return it and then 
    // it calls another function which call resolve() for Promise object , which changes its state(from Pending to Resolved).
    return new Promise(function(resolve,reject){
        let selectorWaitPromise = gtab.waitForSelector(selector,{visible :true});
        selectorWaitPromise
        .then(function () {
            let selectorClickPromise = gtab.click(selector);
            return selectorClickPromise;
        }).then(function () {
            resolve();
        }).catch(function(){
            reject();
        })
    })
}

function waitAndType(selector,words){
    //Returning a promise object . Promise object takes a function in constructor which got invoked as soon
    //as soon as object is created . Inside that function , a new promise is returned , which when fulfilled
    //then .then() function is called which call another promise ("selectorClickPromise") and return it and then 
    // it calls another function which call resolve() for Promise object , which changes its state(from Pending to Resolved).
    return new Promise(function(resolve,reject){
        let selectorWaitPromise = gtab.waitForSelector(selector,{visible :true});
        selectorWaitPromise
        .then(function () {
            let typePromise = gtab.type(selector,words,{delay : 200});
            return typePromise;
        }).then(function () {
            resolve();
        }).catch(function(){
            reject();
        })
    })
}
