# Signal controls and Labs notebook repair

## Direct browser recon

The live preview was opened directly after the repair pass and completed its boot sequence without a new application error. The first-page identity wall is visible in the actual browser with the `curious`, `Parrot OS`, `Telegram`, and `learning` facts preserved as pasted cards and notes. The existing Signal and Labs navigation targets are present in the live DOM. Further checks should exercise the mobile route sheet arrows and inspect the Signal section's route draw state after entering it.

## Signal control check

The live Signal view exposes both `Previous featured item` and `Next featured item` controls in the browser. A first direct click on the reported Next index did not change the visible `ORIGIN` readout, so the control needs a second precise interaction check to distinguish an index-targeting issue from a state-update bug.

After stopping pointer propagation on the controls, a fresh live click on `Next` advanced the readout from `01 / ORIGIN — Learning the stuff` to `02 / SYSTEM — Parrot hours`, changed the route status to `SYSTEM`, and updated the counter from `1 / 3` to `2 / 3`. The pointer-capture conflict was the cause of the original nonfunctional click.

The live console inspection returned no elements for `#featured .ink-route__shadow, #featured .ink-route__path`. The InkRoute layer is mounted as a sibling overlay under `.signal-stage`, not inside the Featured section, so the new scroll-draw selector must target `.ink-route-layer--signal .ink-route__shadow` instead. This explains why the added line animation did not yet control the visible Signal layer.

The corrected selector now finds both Signal InkRoute paths at runtime. The route layer's color was also changed from orange to electric blue to match the request. The full-page desktop capture shows the hero wall and the Labs surface now using ruled notebook lines with a red margin; a focused Labs viewport check remains for readability and overlap review.

The live browser navigation reached Labs and displayed the notebook-paper canvas behind the pasted cards. The first screenshot was captured during the cinematic route settle, so the final readability check should be taken after the travel blur clears.

## Blue-route prototype verification

The isolated `/prototype/labs-lines?v=1` route mounted the Notebook Trace direction with the picker and real project cards. Clicking the live `Evidence Route` picker item switched instantly to `?v=2`, changed the direction label to `node-by-node / indexed proof`, and replaced the continuous path with a structured vertical/horizontal route and sequenced nodes. Desktop and 390px screenshots for all three variants are captured; final handoff now waits on the user's choice.
