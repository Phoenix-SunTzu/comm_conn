var radius = {
    full: 111,
    get min(){ return (this.full) / 1.6180339},
    get child(){ return this.min / 1.6180339}
};


function bubble(origin_x, origin_y, children){
    var _bubble = paper.circle(origin_x, origin_y, 0);

    _bubble.filters = {
        base: null,
        hover: paper.filter(Snap.filter.blur(5, 10)),
        open: null,
        child: null
    };
    _bubble.fill = {
        base: "transparent",
        hover: "#642626",
        open: "#246426",
        child: "#462642"
    };
    _bubble.stroke = {
        base: "silver",
        hover: "gold",
        open: "gold",
        child: "silver"
    };
    _bubble.attr({
        fill: _bubble.fill.base,
        stroke: _bubble.stroke.base
    });
    _bubble.state = 'full';
    _bubble.cx = {
        full: _bubble.node.cx.baseVal.value,
        get min(){
            return this.full - (radius.min / 2);
        }
    };
    _bubble.cy = {
        full: _bubble.node.cy.baseVal.value,
        get min(){
            return this.full - (radius.min / 2);
        }
    };
    _bubble.child_anchors = [
        {
            x: _bubble.cx.full - (radius.full / 1.4166),
            y: _bubble.cy.full + (radius.full / 1.4166)
        },
        {
            x: _bubble.cx.full,
            y: _bubble.cy.full + radius.full
        },
        {
            x: _bubble.cx.full + (radius.full / 1.4166),
            y: _bubble.cy.full + (radius.full / 1.4166)
        },
        {
            x: _bubble.cx.full + radius.full,
            y: _bubble.cy.full
        },
        {
            x: _bubble.cx.full + (radius.full / 1.4166),
            y: _bubble.cy.full - (radius.full / 1.4166)
        }
    ];
    _bubble.hover(function(){
        // Hover In
        if(this.state=='full') {

            this.attr({
                fill: this.fill.hover,
                stroke: this.stroke.hover,
                filter: this.filters.hover
            });
        }
    },
        function(){
        // Hover Out
        if(this.state=='full'){
            this.attr({
                fill: this.fill.base,
                stroke: this.stroke.base,
                filter: this.filters.base
            });
        }
    });
    _bubble.click(function(){
        switch(this.state){
            case 'full':
                this.attr({
                    fill: this.fill.open
                });
                this.state = 'min';
                this.animate({r: radius.min, cx: this.cx.min, cy: this.cy.min},750, mina.elastic);
                var ndx = -1;
                var deploy_children = setInterval(function(){
                    if(++ndx == 5) clearInterval(deploy_children);
                    else _bubble.children[ndx].animate({r: radius.child, cx: _bubble.child_anchors[ndx].x, cy: _bubble.child_anchors[ndx].y}, 750, mina.bounce);
                },100);
                break;
            case 'min':
                this.attr({
                    fill: this.fill.hover
                });
                this.state = 'full';
                this.animate({r: radius.full, cx: this.cx.full, cy: this.cy.full},750, mina.bounce);
                for(ndx in this.children){
                    this.children[ndx].animate({r: 0, cx: _bubble.cx.full, cy: _bubble.cy.full}, 750, mina.elastic);
                }
                break;
        }
    });
    _bubble.animate({r: radius.full},750, mina.bounce);
    _bubble.children = [];
    for(ndx in children){
        var child = paper.circle(_bubble.cx.full, _bubble.cy.full, 0);
        child.attr.fill =
            child.value = children[ndx];
        _bubble.children.push(child);
    }

    return _bubble;
}
