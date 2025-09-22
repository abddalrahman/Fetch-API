	let query = new URLSearchParams(window.location.search);
	let id = query.get('id');
	if(id){
		function getAuther(userId){
			let theUser;
			fetch(`https://dummyjson.com/users/${userId}`)
			.then(function(res){
				if(res.ok){
					return res.json();
				}else{
					throw new Error('Oops something went wrong');
				}
			})
			.then(function(user){
				theUser = user;
			})
			.catch(function(errors){
				theUser='unknown';
			})
			.finally(function(){
				let autherName = document.querySelector('.article-details .auther-name a');
				if(autherName){
					if(theUser != 'unknown'){
						autherName.textContent = theUser.firstName + " " + theUser.lastName;
					}else{ele.textContent="unknown";}
				}
			});
		}

		let art_id ='';
		fetch(`https://dummyjson.com/posts/${id}`)
		.then(function(res){
			if(res.ok){
				return res.json();
			}else{
				throw new Error('Oops something went wrong');
			}
		})
		.then(function(article){
			let article_container = document.querySelector('.article-details');
			if(article_container){
				art_id = article.id
				let tags = '';
				article.tags.forEach(function(tag){
					tags+=`<a class="me-3 py-1 px-2 rounded-2" href="#">#${tag}</a>`
				});
				article_container.innerHTML=`
				<span class="art-id">ARTICLE ID: ${article.id}</span>
				<h1 class="my-4">${article.title}</h1>
				<span class="auther-name">By: <a href="#"></a></span>
				<div class="all-tags my-4">${tags}</div>
				<p>${article.body}</p>
				<div class="more-information d-flex justify-content-between align-items-center mt-auto">
					<div class="like d-flex align-items-center ">
						<span class="d-flex align-items-center ">
							<span class="material-symbols-outlined">thumb_up</span>
							<span class="l-count mx-2">${article.reactions.likes}</span>
						</span>
						<span class="d-flex align-items-center mx-4 ">
							<span class="material-symbols-outlined">thumb_down</span>
							<span class="dl-count mx-2">${article.reactions.dislikes}</span>
						</span>
					</div>
					<div class="views d-flex align-items-center">
						<span class="material-symbols-outlined mx-2">visibility</span>
						<span class="v-count">${article.views}</span>
					</div>
				</div>`
			}
		})
		.catch(function(errors){
			console.log(errors.message)
		})
		.finally(function(){
			getAuther(art_id);
		});
}