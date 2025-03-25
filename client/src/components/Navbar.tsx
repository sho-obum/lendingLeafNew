"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/images/LogoLL.png";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (menu: string | null) => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  };

  return (
    <nav className="absolute top-0 left-0 w-full px-8 py-6 flex justify-between items-center z-20">
      
      {/* Logo */}
      <div className="text-2xl font-bold text-white flex flex-row gap-3">
        <img src={Logo} alt="Logo" width={200} />
      </div>

      {/* Menu Items */}
      <div className="flex gap-6 relative">
        
        {/* Loan Dropdown */}
        <div className="relative">
          <Button
            onClick={() => toggleMenu("loan")}
            className="bg-transparent hover:bg-transparent text-white px-6 py-3 text-base font-thin font-montserrat hover:underline hover:underline-offset-2 transition flex items-center gap-1"
          >
            Loan 
            <motion.div
              animate={{ rotate: openMenu === "loan" ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={16} />
            </motion.div>
          </Button>

          <AnimatePresence>
            {openMenu === "loan" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 mt-2 bg-white text-green-500 rounded-lg shadow-lg w-48 z-20"
              >
                <ul className="flex flex-col p-4 space-y-2 font-bold">
                  <li className="hover:bg-green-100 px-4 py-2 rounded-lg cursor-pointer">Home Loan</li>
                  <li className="hover:bg-green-100 px-4 py-2 rounded-lg cursor-pointer">Personal Loan</li>
                  <li className="hover:bg-green-100 px-4 py-2 rounded-lg cursor-pointer">Business Loan</li>
                  <li className="hover:bg-green-100 px-4 py-2 rounded-lg cursor-pointer">Car Loan</li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Insurance Dropdown */}
        <div className="relative">
          <Button
            onClick={() => toggleMenu("insurance")}
            className="bg-transparent hover:bg-transparent text-white px-6 py-3 text-base font-thin font-montserrat hover:underline hover:underline-offset-2 transition flex items-center gap-1"
          >
            Insurance 
            <motion.div
              animate={{ rotate: openMenu === "insurance" ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={16} />
            </motion.div>
          </Button>

          <AnimatePresence>
            {openMenu === "insurance" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 mt-2 bg-white text-green-600 rounded-lg shadow-lg w-48 z-20"
              >
                <ul className="flex flex-col p-4 space-y-2 font-bold">
                  <li className="hover:bg-green-100 px-4 py-2 rounded-lg cursor-pointer">Health Insurance</li>
                  <li className="hover:bg-green-100 px-4 py-2 rounded-lg cursor-pointer">Life Insurance</li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Credit Card Dropdown */}
        <div className="relative">
          <Button
            onClick={() => toggleMenu("creditCard")}
            className="bg-transparent hover:bg-transparent text-white px-6 py-3 text-base font-thin font-montserrat hover:underline hover:underline-offset-2 transition flex items-center gap-1"
          >
            Credit Card 
            <motion.div
              animate={{ rotate: openMenu === "creditCard" ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={16} />
            </motion.div>
          </Button>

          <AnimatePresence>
            {openMenu === "creditCard" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 mt-2 bg-white text-green-600 rounded-lg shadow-lg w-48 z-20"
              >
                <ul className="flex flex-col p-4 space-y-2 font-bold">
                  <li className="hover:bg-green-100 px-4 py-2 rounded-lg cursor-pointer">HDFC</li>
                  <li className="hover:bg-green-100 px-4 py-2 rounded-lg cursor-pointer">SBI</li>
                  <li className="hover:bg-green-100 px-4 py-2 rounded-lg cursor-pointer">IDFC</li>
                  <li className="hover:bg-green-100 px-4 py-2 rounded-lg cursor-pointer">Axis Bank</li>
                  <li className="hover:bg-green-100 px-4 py-2 rounded-lg cursor-pointer">HSBC</li>
                  <li className="hover:bg-green-100 px-4 py-2 rounded-lg cursor-pointer">AU Bank</li>
                  <li className="hover:bg-green-100 px-4 py-2 rounded-lg cursor-pointer">American Express</li>
                  <li className="hover:bg-green-100 px-4 py-2 rounded-lg cursor-pointer">ICICI</li>
                  <li className="hover:bg-green-100 px-4 py-2 rounded-lg cursor-pointer">IndusInd</li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* EMI Calculator (No Dropdown) */}
        <Button className="bg-transparent hover:bg-transparent text-white px-6 py-3 text-base font-thin font-montserrat hover:underline hover:underline-offset-2 transition">
          EMI Calculator
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
