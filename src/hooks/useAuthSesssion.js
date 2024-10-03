import { useRouter } from "next/navigation";
import { supabase } from "../utils/supabaseClient";
import { useEffect, useState } from "react";

export const useAuthSession = () => {
	const [session, setSession] = useState(null);
	const router = useRouter();
	useEffect(() => {
		async function getSession() {
			const { data } = await supabase.auth.getSession();
			if (data.session) {
				setSession(data.session);
			} else {
				router.push("/login");
			}
		}
		getSession();
	}, []);

	return {
		session,
	};
};
