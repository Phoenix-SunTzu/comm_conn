var radius = {
    full: 50,
    get min(){ return (this.full) / 1.6180339},
    get child(){ return this.min / 1.6180339}
};



function star_point(origin_x, origin_y){
    var _star_point_set = paper.g();

    var ray_path_a1 = StringBuilder('M%1,%2 l -17,-50', origin_x, origin_y);
    var ray_path_a2 = StringBuilder('M%1,%2 l -27,-57', origin_x, origin_y);
    var ray_path_b1 = StringBuilder('M%1,%2 l 27,-65', origin_x, origin_y);
    var ray_path_b2 = StringBuilder('M%1,%2 l 35,-57', origin_x, origin_y);
    var ray_path_c1 = StringBuilder('M%1,%2 l 32,72', origin_x, origin_y);
    var ray_path_c2 = StringBuilder('M%1,%2 l 37,72', origin_x, origin_y);
    var ray_path_d1 = StringBuilder('M%1,%2 l -78,0', origin_x, origin_y);
    var ray_path_d2 = StringBuilder('M%1,%2 l -65,-7', origin_x, origin_y);
    _star_point_set.star = paper.g(
        paper.path(ray_path_a1).addClass('star_ray1'),
        paper.path(ray_path_a2).addClass('star_ray2'),
        paper.path(ray_path_b1).addClass('star_ray1'),
        paper.path(ray_path_b2).addClass('star_ray2'),
        paper.path(ray_path_c1).addClass('star_ray1'),
        paper.path(ray_path_c2).addClass('star_ray2'),
        paper.path(ray_path_d1).addClass('star_ray1'),
        paper.path(ray_path_d2).addClass('star_ray2'),
        paper.circle(origin_x, origin_y, 3).addClass('star_point')
    ).addClass('star');
    //paper.polygon(origin_x, origin_y - radius.full, origin_x + radius.min / 2, origin_y, origin_x, origin_y + radius.full, origin_x - radius.min / 2, origin_y).addClass('star_point');

    var ring_path_a = StringBuilder('M%1,%2 a25,11 -20 0,1 50,0 a25,11 -20 0,1 -90,0', origin_x, origin_y);
    var ring_path_b = StringBuilder('M%1,%2 a25,11 -20 0,1 45,0 a25,11 -20 0,1 -75,0', origin_x, origin_y);
    var ring_path_c = StringBuilder('M%1,%2 a25,11 -20 0,1 40,0 a25,11 -20 0,1 -60,0', origin_x, origin_y);
    _star_point_set.ring = paper.g(
        paper.path(ring_path_a).addClass('ring'),
        paper.path(ring_path_b).addClass('ring'),
        paper.path(ring_path_c).addClass('ring')
    );
    _star_point_set.add(_star_point_set.star);
    _star_point_set.add(_star_point_set.ring);

    _star_point_set.addClass('star_point_set');
     _star_point_set.filters = {
        base: null,
        hover: paper.filter(Snap.filter.blur(2, 5)),
        open: null,
        child: null,
         aura: paper.filter(Snap.filter.shadow(10, 10, 2, 'goldenrod', 0.4))
    };
    _star_point_set.fill = {
        base: 'transparent',
        hover: 'transparent',
        open: "transparent",
        child: "transparent"
    };
    _star_point_set.stroke = {
        base: 'goldenrod',
        hover: "maroon",
        open: "gold",
        child: "silver"
    };
    _star_point_set.attr({
        fill: _star_point_set.fill.base,
        stroke: _star_point_set.stroke.base,
        width: radius.full * 2
    });
    _star_point_set.state = 'full';
    _star_point_set.cx = {
        full: origin_x,
        get min(){
            return this.full - (radius.min / 2);
        }
    };
    _star_point_set.cy = {
        full: origin_y,
        get min(){
            return this.full - (radius.min / 2);
        }
    };
    _star_point_set.child_anchors = [
        {
            x: _star_point_set.cx.full - (radius.full / 1.4166),
            y: _star_point_set.cy.full + (radius.full / 1.4166)
        },
        {
            x: _star_point_set.cx.full,
            y: _star_point_set.cy.full + radius.full
        },
        {
            x: _star_point_set.cx.full + (radius.full / 1.4166),
            y: _star_point_set.cy.full + (radius.full / 1.4166)
        },
        {
            x: _star_point_set.cx.full + radius.full,
            y: _star_point_set.cy.full
        },
        {
            x: _star_point_set.cx.full + (radius.full / 1.4166),
            y: _star_point_set.cy.full - (radius.full / 1.4166)
        }
    ];
    _star_point_set.hover(
        function(){
        // Hover In
            this.star.attr({

            });
    },
        function(){
        // Hover Out
            this.star.attr({

            });
    });
    _star_point_set.click(function(){
        switch (this.state) {
            case 'full':
                _star_point_set.attr({
                    fill: _star_point_set.fill.open
                });
                _star_point_set.state = 'min';
                _star_point_set[1].animate({r: 0, cx: this.cx.min, cy: this.cy.min}, 750, mina.elastic);
                var ndx = -1;
                var deploy_children = setInterval(function () {
                    if (++ndx == 5) clearInterval(deploy_children);
                    else _star_point_set.children[ndx].animate({
                        r: radius.child,
                        cx: _star_point_set.child_anchors[ndx].x,
                        cy: _star_point_set.child_anchors[ndx].y
                    }, 750, mina.bounce);
                }, 100);
                break;
            case 'min':
                _star_point_set.attr({
                    fill: _star_point_set.fill.hover
                });
                _star_point_set.state = 'full';
                _star_point_set[1].animate({r: radius.min, cx: this.cx.full, cy: this.cy.full}, 750, mina.bounce);
                for (ndx in this.children) {
                    _star_point_set.children[ndx].animate({
                        r: 0,
                        cx: _star_point_set.cx.full,
                        cy: _star_point_set.cy.full
                    }, 750, mina.elastic);
                }
                break;
        }
    });
    _star_point_set.ring.animate({r: radius.min},750, mina.bounce);
    _star_point_set.children = paper.g();
    var _children = ['mic', 'note', 'photo', 'pin', 'search'];
    for(ndx in _children){
        var child = paper.circle(_star_point_set.cx.full, _star_point_set.cy.full, 0);
        child.attr.fill = _star_point_set.fill.child;
        child.value = _children[ndx];
        child.hover(
            function(){
                // Hover In
                this.attr({
                    filter: _star_point_set.filters.hover
                });

            },
            function(){
                // Hover Out
                this.attr({
                    filter: _star_point_set.filters.base
                });

            });
        child.click(function(){
            alert(this.value);
        });
        _star_point_set.children.add(child);
    }
    _star_point_set.add(_star_point_set.children);

    return _star_point_set;
}