# Agent Notes

- Commit after every completed change from now on. Keep commits focused, and run the relevant checks before committing when feasible.
- Treat this as a practical furniture sketching and ordering tool, not a marketing site. Prefer dense, direct, work-focused UI over decorative presentation.
- Preserve user drawings and dimensions carefully. Any change that can alter existing piece dimensions, depth, material, laminate settings, anchors, or order output should be deliberate and easy to understand.
- Keep domain concepts consistent: pieces are boards or panels; structural pieces can connect and anchor; overlay pieces such as backs/fronts should not create false structural conflicts; material thickness and depth should affect measurement and ordering behavior.
- Make controls discoverable through familiar icons, clear labels, hover titles, and forgiving hit targets. Compact UI is good, but not at the expense of accurate dragging, resizing, or measuring.
- When adding project data, keep older saved projects compatible by choosing sensible defaults for missing values.
- After frontend changes, verify the app in the browser when practical, especially for canvas behavior, toolbar actions, and sidebar controls.
- Preferred checks are the TypeScript production build and geometry smoke test. Run both before committing unless the change is purely textual or there is a clear reason not to.
- Avoid broad rewrites. The codebase is intentionally small, so favor straightforward changes that match existing patterns.
- Leave unrelated uncommitted changes untouched. Stage only the files needed for the current change.
