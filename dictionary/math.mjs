export default `

to.native math.floor [ x ] {
    "
        return this.Token.box(Math.floor({{X}}));
    "
}

to math.integer [ x ] {
    math.floor x
}

to.native math.ceil [ x ] {
    "
        return this.Token.box(Math.ceil({{X}}));
    "
}

to.native math.round [ x ] {
    "
        return this.Token.box(Math.round({{X}}));
    "
}

to.native math.random [ ] {
    "
        return this.Token.box(Math.random());
    "
}

to math.random.between [ l h ] {
    r = math.random
    d = (h - l)
    l + (r * d)
}

to math.random.integer.between [ l h ] {
    math.integer (math.random.between l h)
}


to.native math.sin [ r ] {
    "
        return this.Token.box(Math.sin({{R}}));
    "
}

to.native math.cos [ r ] {
    "
        return this.Token.box(Math.cos({{R}}));
    "
}

to.native math.pi [ ] {
    "
        return this.Token.box(Math.PI);
    "
}

to math.from.deg.to.rad [ d ] {
    d * ( math.pi / 180 )
}

to math.from.rad.to.deg [ r ] {
    r / ( math.pi / 180 )
}

to math.to.rad.from.deg [ d ] {
    math.from.deg.to.rad d
}

to math.to.deg.from.rad [ r ] {
    math.from.rad.to.deg r
}

`;
