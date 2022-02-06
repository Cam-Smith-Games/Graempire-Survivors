// TODO: add more
export var TargetPriority;
(function (TargetPriority) {
    TargetPriority[TargetPriority["NEAREST"] = 0] = "NEAREST";
    TargetPriority[TargetPriority["LOWEST_HP"] = 1] = "LOWEST_HP";
    TargetPriority[TargetPriority["HIGHEST_HP"] = 2] = "HIGHEST_HP";
})(TargetPriority || (TargetPriority = {}));
;
export class RaidGroup {
    constructor(p) {
        var _a;
        this.name = p.name;
        this.priority = (_a = p === null || p === void 0 ? void 0 : p.priority) !== null && _a !== void 0 ? _a : TargetPriority.NEAREST;
        this.area = (p === null || p === void 0 ? void 0 : p.area) ? new Phaser.Geom.Rectangle(p.area.x, p.area.y, p.area.width, p.area.height) : null;
    }
}
//# sourceMappingURL=group.js.map