import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";
import { FiSettings, FiHome, FiX } from "react-icons/fi";
import { CgDetailsMore, CgDetailsLess } from "react-icons/cg";
import { BsPeople } from "react-icons/bs";
import SpringModal from "./SpringModal";
import { IconType } from "react-icons";

interface LinkProps {
  text: string;
  Icon: IconType;
  path: string;
}

const FloatingBottomNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState<string>("");

  useEffect(() => {
    const storedKey = localStorage.getItem("MYKEY") || "";
    setApiKey(storedKey);
  }, []);

  return (
    <div className="relative flex justify-center items-center w-full">
      <motion.nav className="bg-white text-black shadow-lg flex items-center justify-between absolute bottom-4 left-0 right-0 mx-auto w-max">
        <MenuButton setOpen={setIsOpen} open={isOpen} />
        <div className="flex gap-6 px-6">
          <Link text="Home" Icon={FiHome} path="/" />
          <Link text="Basic" Icon={CgDetailsLess} path="/basic-questions" />
          <Link text="Detailed" Icon={CgDetailsMore} path="/detailed-questions" />
          <Link text="About" Icon={BsPeople} path="/about-us" />
        </div>
        <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} apiKey={apiKey} setApiKey={setApiKey} />
      </motion.nav>
    </div>
  );
};

const Link: React.FC<LinkProps> = ({ text, Icon, path }) => {
  return (
    <RouterLink to={path} className="text-sm w-12 hover:text-indigo-500 transition-colors flex flex-col gap-1 items-center">
      <Icon />
      <span className="text-xs">{text}</span>
    </RouterLink>
  );
};

const MenuButton = ({ setOpen, open }: { setOpen: Dispatch<SetStateAction<boolean>>; open: boolean }) => {
  return (
    <div onClick={() => setOpen(!open)} className="text-xl font-bold h-full bg-black text-white">
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-4">
        {open ? <FiX /> : <FiSettings />}
      </motion.button>
    </div>
  );
};

export default FloatingBottomNav;
