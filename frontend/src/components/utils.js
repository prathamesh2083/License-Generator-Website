


import html2canvas from "html2canvas";
export const takeScreenShot=(elementId,fileName,fileType,backgroundColor="#000000")=>{
    const element=document.getElementById(elementId);
    if(!element){
        return;
    }
    html2canvas(element,{
        backgroundColor:backgroundColor
    }).then((canvas)=>{
        let image=canvas.toDataURL(fileType);
        const a=document.createElement("a");
        a.href=image;
        a.download=fileName;
        a.click();

    }).catch(err=>{
        console.log("error");
    })
}