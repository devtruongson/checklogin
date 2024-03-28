for(let i =0 ; i< 15000; i++) {
    fetch("https://profile-counter.glitch.me/devtruongson/count.svg")
    .then(res => {
      console.log("success");
    }) 
    .catch(err => {
        console.log("co loi")
    })
  }