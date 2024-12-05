import Image from "next/image";
import logo from "../../public/Imagem colada.png";
import video from "../../public/video.png";
import Button from "./button";
import { IoVideocamOutline } from "react-icons/io5";
import Search from "./search";

export default function Nav() {
    const open = () => {
        console.log("fhh")
    }
    const pesquisar = () => {
        console.log("jvg")
    }
    return (
        <div className="bg-primary flex g-5 justify-between	p-2">
            <div className="flex gap-3 p-1 justify-items-center">
                {/* <Image src={video} alt="video" width={50} height={10}/> */}
                <IoVideocamOutline size={28} color="#E51A54" className="flex self-center justify-items-center" />
                <Image src={logo} alt="logo" width={109} height={35}/>
            </div>
            <div className="flex flex-1 justify-end items-center gap-4 pr-4">
                <Search onSearch={pesquisar()}  className="w-80"/>
                <Button children="Faça login" onClick={open()} className="w-28 font-size-5" />
            </div>

        </div>
    );
}