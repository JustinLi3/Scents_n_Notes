import React from "react"
import BaseLayout from "./baseLayout";
import TestPage from "./TestPage";

const About = () => {
   return( 
      <>
         <TestPage></TestPage>
         <div style={{ margin: "140px" }} >
            <h1>
               About
            </h1>           
            <div className="d-flex justify-content-center" style={{ gap: "20px" }}>  
               <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam arcu mauris, placerat vitae dictum ac, dignissim in justo. Sed commodo, massa et facilisis egestas, leo enim tincidunt libero, id semper magna ipsum placerat metus. Nunc ac interdum neque, quis lobortis sem. Proin id ornare diam, ac dapibus magna. Nam rhoncus accumsan gravida. Nulla quis purus sodales, scelerisque eros id, venenatis odio. Etiam ut orci faucibus, rhoncus elit sed, sagittis ligula. Maecenas feugiat auctor risus sit amet viverra. Integer vulputate felis eget leo tempor, et feugiat nisi venenatis. Maecenas id tristique tortor. Suspendisse ut auctor risus. Nullam sit amet felis porta, hendrerit lorem nec, mattis tortor. Nulla libero metus, iaculis vitae mi a, egestas semper metus. Ut vel felis orci. Ut quis fermentum risus. Sed iaculis arcu at consequat laoreet.
               </p>
               <img src="public\ME.jpg" style={{width:"300px", height:"400px", objectFit:"cover"}}></img>
            </div> 
         </div>
      </>
   );
};

export default About;