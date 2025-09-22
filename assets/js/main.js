let articles_container = document.querySelector('.articles');
let article_order = document.querySelector('.controle .article-order');
let article_in_page = document.querySelector('.controle .article-in-page');
article_in_page.value=12;
article_order.value='d';
let prev_btn = document.querySelector('.prev');
let next_btn = document.querySelector('.next');
let num_of_num = document.querySelector('.num-of-num');

let total_is = 0;
let pages_count_is = 0;
let current_pages = 1;
let limit_is = 12;
let skip_is = 0;
let order_stetment ='';
let search_stetment ='';

if(articles_container){
	fetchArticles(limit_is, skip_is, order_stetment, search_stetment);
}else{
	let body = document.querySelector('body');
	if(body){
		body.innerHTML='Articles cannot be displayed';
	}
}

function fetchArticles(limit, skip, order, search=''){
	let api_query = search =='' ? `?limit=${limit}&skip=${skip}&select=id,title,body,reactions,userId${order}` : '';
	fetch(`https://dummyjson.com/posts${search}${api_query}`)
	.then(function(res){
		if(res.ok){
			return res.json();
		}else{
			throw new Error('Oops something went wrong');
		}
	})
	.then(function(articles){
		total_is = articles.total;
		pages_count_is = Math.ceil(total_is/limit_is) ;
		num_of_num.textContent=  search =='' ? current_pages + " of " + pages_count_is : 'all results'
		let all_articles = '';
		let all_posts = articles.posts;
		// console.log(articles);
		all_posts.forEach(function(article){
			let shortBody = article.body.substring(0, 70) + "...";
			all_articles+=`
			<div class="col-12 col-lg-4 col-sm-6 col-xl-3 article mb-4">
					<a href="article.html?id=${article.id}" class="p-3 rounded-3 d-inline-block">
						<h4>${article.title}</h3>
						<p>${shortBody}</p>
						<div class="activity d-flex justify-content-between align-items-center mt-auto">
							<div class="likes d-flex align-items-center">
								<span class="material-symbols-outlined">thumb_up</span>
								<span class="mx-2">${article.reactions.likes} Likes</span>
							</div>
							<div class="dislikes d-flex align-items-center ">
								<span class="material-symbols-outlined">thumb_down</span>
								<span class="mx-2">${article.reactions.dislikes}</span>
							</div>
						</div>
						<span data-user="${article.userId}" class="mt-3 d-block"></span>
					</a>
				</div>`
		});
		articles_container.innerHTML=all_articles;
	})
	.catch(function(errors){
		articles_container.innerHTML=`${errors.message}`;
	})
	.finally(function(){
		// console.log('fetching articles is done');
		getAuther();
	});
}

function getAuther (){
	let all_users;
	fetch('https://dummyjson.com/users?limit=1000')
	.then(function(res){
		if(res.ok){
			return res.json();
		}else{
			throw new Error('Oops something went wrong');
		}
	})
	.then(function(users){
		all_users = users.users;
		// console.log(all_users);
	})
	.catch(function(errors){
		all_users='unknown';
	})
	.finally(function(){
		// console.log('fetching users is done');
		let autherName = document.querySelectorAll('.article > a > span');
		if(autherName){
			autherName.forEach(function(ele){
				let user_id = ele.getAttribute('data-user');
				if(all_users != 'unknown'){
					all_users.forEach(function(user){
						if(user.id == user_id){
							ele.textContent = user.firstName + " " + user.lastName;
						}
					});
				}else{ele.textContent="unknown";}
			});
		}

	});
}

// handle controle section-------------------
let searchBtn = document.querySelector('.search-cont span.search-btn');
if(searchBtn){
	searchBtn.addEventListener('click', function(){
		next_btn.classList.add('stop');
		prev_btn.classList.add('stop');
		let inp_val = document.querySelector('.search-cont input').value;
		if(inp_val.trim()!= '' && inp_val.trim().length >= 3){
			search_stetment = `/search?q=${inp_val}`;
			// console.log(search_stetment)
			fetchArticles(limit_is, skip_is, '', search_stetment);
		}else{
			// console.log('no result')
		}
	})
}

if(article_in_page){
	article_in_page.addEventListener('change', function(){
		next_btn.classList.remove('stop');
		current_pages = 1;
		limit_is = parseInt(article_in_page.value);
		skip_is = 0;
		order_stetment = '';
		search_stetment = '';
		document.querySelector('.search-cont input').value='';
		fetchArticles(limit_is, skip_is, order_stetment, search_stetment);
	});
}

if(article_order){
	article_order.addEventListener('change', function(){
		next_btn.classList.remove('stop');
		if(article_order.value !='d'){
			search_stetment = '';
			order_stetment = `&sortBy=title&order=${article_order.value}`
			document.querySelector('.search-cont input').value='';
			fetchArticles(limit_is, skip_is, order_stetment, search_stetment);
		}else{
			window.location.reload();
		}
	});
}

next_btn.addEventListener('click', function(){
	prev_btn.classList.remove('stop');
	if(current_pages < pages_count_is){
		skip_is+= limit_is;
		current_pages+=1;
		search_stetment ="";
		if(current_pages == pages_count_is){next_btn.classList.add('stop')}
		fetchArticles(limit_is, skip_is, order_stetment, search_stetment);
	}
})
prev_btn.addEventListener('click', function(){
	next_btn.classList.remove('stop');
	if(current_pages > 1){
		skip_is-= limit_is;
		current_pages-=1;
		search_stetment ="";
		if(current_pages == 1){prev_btn.classList.add('stop')}
		fetchArticles(limit_is, skip_is, order_stetment, search_stetment);
	}
})