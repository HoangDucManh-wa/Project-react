import { createContext, useContext } from "react";
// createContext: tạo "kho dữ liệu chung"
// useContext: hook để lấy dữ liệu từ kho đó

import { useAuth } from "../hooks/useAuth";
// import logic auth (login, logout, register, state...)

// Tạo context (nơi chứa dữ liệu global)
// null là giá trị mặc định (chưa có Provider bọc bên ngoài)
const AuthContext = createContext(null);

// Provider: component dùng để "bọc" toàn app
// → giúp toàn bộ app truy cập được auth
export const AuthProvider = ({ children }) => {
  // Gọi hook useAuth → lấy toàn bộ logic + state
  // Bao gồm: user, userId, state, error, handleLogin...
  const auth = useAuth();

  return (
    // Provider sẽ "phát" dữ liệu xuống toàn bộ component con
    // value={auth} nghĩa là truyền toàn bộ auth xuống dưới
    <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
  );
};

// Custom hook để dùng context cho gọn + an toàn
export const useAuthContext = () => {
  // Lấy dữ liệu từ AuthContext
  const context = useContext(AuthContext);

  // Nếu component dùng hook này mà KHÔNG nằm trong AuthProvider
  // → sẽ bị lỗi ngay (tránh bug khó debug)
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }

  // Trả về toàn bộ auth (user, login, logout...)
  return context;
};
