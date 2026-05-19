import { BiLogoTypescript } from "react-icons/bi";
import { FaMarkdown } from "react-icons/fa";
import { LiaCss3, LiaHtml5, LiaJsSquare } from "react-icons/lia";
import { PiFileJsx } from "react-icons/pi";
import { TbFileTypeTsx } from "react-icons/tb";

const iconStyle = {
  width: "30px",
  height: "30px",
};
export const FileIcon = ({ extension }: { extension: string }) => {
  const iconMap: Record<string, React.ReactNode> = {
    js: <LiaJsSquare style={iconStyle} color="yellow" />,
    ts: <BiLogoTypescript style={iconStyle} color="blue" />,
    jsx: <PiFileJsx style={iconStyle} color="blue" />,
    tsx: <TbFileTypeTsx style={iconStyle} color="blue" />,
    css: <LiaCss3 style={iconStyle} color="green" />,
    html: <LiaHtml5 style={iconStyle} color="orange" />,
    gitignore: <span style={{ fontSize: "20px" }}>🙈</span>,
    md: <FaMarkdown style={iconStyle} color="black" />,
  };

  return <span>{iconMap[extension] || "📄"}</span>;
};
