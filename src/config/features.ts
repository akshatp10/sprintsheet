const isEnabled = (value: string | undefined) => value === "true";

export const features = {
	// Project views
	PROJECT_HOME: isEnabled(import.meta.env.VITE_FEATURE_PROJECT_DASHBOARD),
	PROJECT_BOARD: isEnabled(import.meta.env.VITE_FEATURE_PROJECT_BOARD),
	PROJECT_TASKS: isEnabled(import.meta.env.VITE_FEATURE_PROJECT_TASKS),
	PROJECT_CYCLES: isEnabled(import.meta.env.VITE_FEATURE_PROJECT_CYCLES),
	HOME_PEOPLE: isEnabled(import.meta.env.VITE_FEATURE_HOME_PEOPLE),
	SHOW_BACKLOG: isEnabled(import.meta.env.VITE_FEATURE_SHOW_BACKLOG),

	// View toggles
	PROJECT_VIEW_TOGGLE: isEnabled(
		import.meta.env.VITE_FEATURE_PROJECT_VIEW_TOGGLE,
	),
	TASK_VIEW_TOGGLE: isEnabled(import.meta.env.VITE_FEATURE_TASK_VIEW_TOGGLE),

	// Sidebar Setting
	VIEW_SETTING: isEnabled(import.meta.env.VITE_FEATURE_VIEW_SETTINGS),
} as const;

export type Feature = keyof typeof features;

export const isFeatureEnabled = (feature: Feature) => {
	return features[feature];
};

export const currentUserEmail = import.meta.env.VITE_CURRENT_USER_EMAIL;
