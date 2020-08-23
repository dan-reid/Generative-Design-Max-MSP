(function (max) {
	/**
	 * Automatically enable mouse xy position polling for jit.window inside jit.world
	 */
	if (max.patcher && max.patcher.count > 0 && max.patcher.firstobject) {
		var jit_world = null;
		var obj = max.patcher.firstobject;

		if (obj) {
			if (obj.maxclass === 'jit.world') {
				jit_world = obj;
			} else {
				var i = 0;
				while (obj && obj.nextobject && i < max.patcher.count) {
					var next_obj = obj.nextobject;
					if (next_obj && next_obj.maxclass && next_obj.maxclass === 'jit.world') {
						jit_world = next_obj;
						break;
					}
					obj = next_obj;
					i++;
				}
			}
			if (jit_world && jit_world.valid) {
				jit_world.message('sendwindow', 'idlemouse', 1);
			} else {
				var msg = "warning - couldn't automatically enable idlemouse polling\n";
				msg += 'ensure the patch contains a jit.world object and then re-complile your script\n';
				msg += 'alternatively, you can send jit.world the message: sendwindow idlemouse 1\n';
				msg += "if your patch doesn't require automatic mouse position polling you can ignore this warning\n";
				post('gd.mouseinfo (js):', msg);
			}
		}
	}
})(this);

var mousex = 0;
var mousey = 0;
var mousedown = 0;
