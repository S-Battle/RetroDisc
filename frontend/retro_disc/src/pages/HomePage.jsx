import React, {useEffect} from  "react";



const HomePage = () => {

    const urlFix = 'http://localhost:3000';

    useEffect(()=>{

        const getApi = async ()=>{
            
            const result = await fetch(`${urlFix}/api`);
            const data = await result.json()
            console.log(data)
        }

    getApi();

    },[])

          return(
                             <>
                                HOME PAGE
                             </>
          );

}



export default HomePage;