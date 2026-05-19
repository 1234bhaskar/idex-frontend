import { BiLogoTypescript } from "react-icons/bi";
import { LiaCss3, LiaHtml5, LiaJsSquare } from "react-icons/lia";
import { PiFileJsx } from "react-icons/pi";
import { TbFileTypeTsx } from "react-icons/tb";

const iconStyle = {
  width: "30px",
  height: "30px",
};
export const FileIcon = ({ extension }: { extension: string }) => {
  const iconMap: Record<string, React.ReactNode> = {
    js: <LiaJsSquare style={iconStyle} />,
    ts: <BiLogoTypescript style={iconStyle} />,
    jsx: <PiFileJsx style={iconStyle} />,
    tsx: <TbFileTypeTsx style={iconStyle} />,
    css: <LiaCss3 style={iconStyle} />,
    html: <LiaHtml5 style={iconStyle} />,
  };

  return <span>{iconMap[extension] || "📄"}</span>;
};
