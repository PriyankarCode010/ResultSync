export { default } from "next-auth/middleware";

export const config = { 
    matcher: [
        "/",
        "/admin",
        "/student",
        "/teacher",
        "/admin/result",
        "/admin/logout",
        "/teacher/result",
        "/teacher/logout",
        "/student/result",
        "/student/logout"
    ] };




    