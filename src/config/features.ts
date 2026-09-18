const isEnabled = (value: string | undefined) => value === "true";

export const features = {
	// Project views
	projectHome: isEnabled(import.meta.env.VITE_FEATURE_PROJECT_DASHBOARD),
	projectBoard: isEnabled(import.meta.env.VITE_FEATURE_PROJECT_BOARD),
	projectTasks: isEnabled(import.meta.env.VITE_FEATURE_PROJECT_TASKS),
	projectCycles: isEnabled(import.meta.env.VITE_FEATURE_PROJECT_CYCLES),
	homePeople: isEnabled(import.meta.env.VITE_FEATURE_HOME_PEOPLE),
	showBacklog: isEnabled(import.meta.env.VITE_FEATURE_SHOW_BACKLOG),

	// View toggles
	projectViewToggle: isEnabled(
		import.meta.env.VITE_FEATURE_PROJECT_VIEW_TOGGLE,
	),
	taskViewToggle: isEnabled(import.meta.env.VITE_FEATURE_TASK_VIEW_TOGGLE),

	// Sidebar Setting
	viewSetting: isEnabled(import.meta.env.VITE_FEATURE_VIEW_SETTINGS),
} as const;

export type Feature = keyof typeof features;

export const isFeatureEnabled = (feature: Feature) => {
	return features[feature];
};

export const currentUserEmail = import.meta.env.VITE_CURRENT_USER_EMAIL;
