const checkDuplication = (email) => {
    const emailRegex = new RegExp('^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z-.]+$')
    console.log(email)
    try{
      firebase_db.ref('users').orderByChild("profile/UserEmail")
      .equalTo(email)
      .once('value')
      .then((snapshot)=>{ 
        console.log(snapshot)
        if(email.match(emailRegex)){
          if(snapshot.exists()){
            console.log('이미 존재합니다.')
            setIsCheck('존재');
          }else{
            console.log('사용 가능합니다.')
            setIsCheck('미존재')
          }
        }else{
          setIsCheck('잘못된 형식')
        }
    })
    }catch{
      console.log('잠시 후 시도해 주십시오.')
    }
  }