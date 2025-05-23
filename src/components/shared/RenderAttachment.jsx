import { transformImage } from "../../lib/features";
import { FileOpen as FileOpenIcon } from "@mui/icons-material";


const RenderAttachment = (file, url) => {
  switch(file){
    case "video":
        return <video src={url} preload="none" width={"200px"} controls></video>
        

    case "image":
            return <img src={transformImage(url, 200)} alt="Attachment"
            width={"200px"} height={"200px"} style={{objectFit: "contain",}} ></img>
            

     case "audio":
     return  <audio src={url} preload="none" controls></audio>
            

        default:
        return <FileOpenIcon />

        

    




  }
};

export default RenderAttachment