let articleForm = document.getElementById("articleForm");

articleForm.addEventListener("submit", getArticle);

function getArticle(e) {
  e.preventDefault();
  let inputText = document.getElementById("articleSearchText").value;

  this.state = {
    apiKey: "1305f00e5f7249bdb6769f75bb828d52",
    q: inputText,
    text: "",
    sort: ""
  };

  axios
    .get(
      "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" +
        this.state.q +
        "&api-key=" +
        this.state.apiKey
    )
    .then(response => {
      // console.log(response);
      var headline = response.data.response.docs;
      let output = "";
      //console.log(headline);

      for (var i = 0; i < headline.length; i++) {
        var title = response.data.response.docs[i].headline.main;
        var snippet = response.data.response.docs[i].snippet;
        var fullArticle = response.data.response.docs[i].web_url;
        //console.log(thumbnail);
        output += `
          <div class="col-md-3 mt-3">
            <div class="well text-center">
              <h5 class="text-success">${title}</h5>
              <p class="text-white">${snippet}</p>
              <a class="btn btn-primary" href="${fullArticle}" target="_blank">Read Full Article</a>
            </div>
          </div>
        `;

        document.getElementById("output").innerHTML = output;
      }
    })
    .catch(err => {
      console.log(err);
    });

  e.preventDefault();
}

//  <img src="https://www.nytimes.com/${thumbnail}" alt="No Image">
//  <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
//output += `
//   <div class="col-md-3">
//     <div class="well text-center">
//       <img src="${thumbnail}" alt="Not Avaliable">
//       <h5>${headline}</h5>
//       <p>${snippet}</p>
//     </div>
//   </div>
// `;
