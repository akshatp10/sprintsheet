import { getUserById } from "@/lib/db/dbFunctions/userFunctions";
import type { ApiResponse } from "../types";
import type { User } from "./types";

export const getUser = async (id: string): Promise<ApiResponse<User>> => {
	try {
		const user = await getUserById(id);

		if (!user) {
			return {
				status: 404,
				success: false,
				message: "User not found",
				data: null,
			};
		}

		return {
			status: 200,
			success: true,
			message: "Successfully fetched user",
			data: user,
		};
	} catch {
		return {
			status: 500,
			success: false,
			message: "Internal Server Error",
			data: null,
		};
	}
};
