import React, {useState} from "react";
import style from './actionButton.module.css'

const ActionButton = () => {
    const mainClassName = `social ${style.hide}`;
    const close_button = "close-button";
    const [classname,setClassname] = useState(mainClassName);
    const [close,setClosebutton] = useState(close_button);
    
    function Toggle(){
        
        if(classname == "social"){
        setClassname(`social ${style.hide}`);
        setClosebutton("close-button");
        }else{
            setClassname("social");
            setClosebutton(`close-button ${style.closeButtonRotate}`);
        }
    }
       
    return(
    <> 
    <div className={style.wrapper}> 
      <a className={classname} href="#"><i className="fa fa-file"></i></a> 
      <a className={classname} href="#"><i className="fa fa-image"></i></a> 
      <a className={classname} href="#"> <i className="fa fa-print"></i></a> 
      <a className={close} onClick={Toggle} href="#"> <i className="fa fa-plus"></i></a>
    </div> 
    </> 
        );
}

export default ActionButton