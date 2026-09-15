import type { ComponentPropsWithoutRef } from "react";

const CONTROL_CLASSES =
    "w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white";

type CommonProps = { id: string; label: string };

type FormFieldProps =
    | (CommonProps & { as?: "input" } & ComponentPropsWithoutRef<"input">)
    | (CommonProps & { as: "textarea" } & ComponentPropsWithoutRef<"textarea">);

/**
 * Labelled form control. The three fields previously repeated the same label +
 * control + long class list; this keeps focus rings and dark-mode styling
 * identical across all of them.
 */
export default function FormField({ id, label, className, ...rest }: FormFieldProps) {
    const classes = `${CONTROL_CLASSES} ${className ?? ""}`;

    return (
        <div>
            <label
                htmlFor={id}
                className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
                {label}
            </label>

            {rest.as === "textarea" ? (
                <textarea id={id} className={classes} {...rest} />
            ) : (
                <input id={id} className={classes} {...rest} />
            )}
        </div>
    );
}
