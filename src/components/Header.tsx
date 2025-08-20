"use client";

import React from "react";
import Link from "next/link";
import { User } from "@/types";
import { getRoleColor } from "@/utils/helpers";
import Badge from "./ui/Badge";
import { motion } from "framer-motion";
import Image from "next/image";

interface HeaderProps {
  user?: User;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <motion.div
                  className="flex items-center space-x-3"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                    <Image
                      src="/glory-school.jpg"
                      alt="Logo"
                      width={68}
                      height={68}
                      className="rounded-full"
                    />
                  </div>
                  {/* <div>
                    <h1 className="text-xl font-bold text-gray-900">
                      GLORY SCHOOL
                    </h1>
                    <p className="text-sm text-blue-600 font-medium"></p>
                  </div> */}
                </motion.div>
              </div>
              <span className="text-xl font-bold  pl-4 text-gray-900">
                ExamCenter
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Dashboard
            </Link>
            <Link
              href="/tests"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Tests
            </Link>
            <Link
              href="/results"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Results
            </Link>
            <Link
              href="/practice/ai"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Practice with AI
            </Link>
            {user?.role === "teacher" || user?.role === "admin" ? (
              <Link
                href="/admin"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Admin
              </Link>
            ) : null}
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500">{user.school.name}</p>
                </div>
                <Badge
                  variant="info"
                  size="sm"
                  className={getRoleColor(user.role)}
                >
                  {user.role}
                </Badge>
              </div>
            ) : (
              <Link
                href="/login"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
