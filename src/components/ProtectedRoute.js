"use client";
// components/ProtectedRoute.js
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthSession } from "../hooks/useAuthSesssion";

export default function ProtectedRoute({ children, requiredRole }) {
	const { session } = useAuthSession();

	const router = useRouter();
	const [userRole, setUserRole] = useState("department_user");

	useEffect(() => {
		if (session) {
			fetchUserRole();
		}
	}, [session]);

	const fetchUserRole = async () => {
		// const { data, error } = await supabase
		// 	.from("profiles")
		// 	.select("role")
		// 	.eq("id", session.user.id)
		// 	.single();
		// if (error) {
		// 	alert(error.message);
		// 	router.push("/login");
		// } else {
		// 	setUserRole(data.role);
		// 	if (requiredRole && data.role !== requiredRole) {
		// 		alert("Access denied");
		// 		router.push("/");
		// 	}
		// }
		if (userRole !== requiredRole) {
			alert("Access denied");
			if (userRole === "department_user") {
				router.push("/dashboard");
			} else {
				router.push("/management_dashboard");
			}
		}
	};

	if (!userRole) return null;

	return children;
}
