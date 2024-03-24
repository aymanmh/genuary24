class Shape
{
    constructor()
    {
        rectMode(CENTER);
    }

    shape1Width = 1;
    shape2Width = 1;

    shape1Exists = true;
    shape2Exists = false;

    increment = 40;
    threshold = 25;

    shapeColor = 0;
    drawShape1()
    {
        noFill();
        strokeWeight(1);
        stroke(this.shapeColor);
        square(0, 0, this.shape1Width);
        this.shape1Width += this.shape1Width/this.increment;
    }

    drawShape2()
    {
        noFill();
        strokeWeight(1);
        stroke(this.shapeColor);
        square(0, 0, this.shape2Width);
        this.shape2Width += this.shape2Width/this.increment;
    }

    display()
    {

        if(this.shape1Exists)
        {
            this.drawShape1();
        }

        if(this.shape1Width > width * 2)
        {
            this.shape1Width = 1;
            this.shape1Exists = false;
        }

        if(this.shape1Width > this.threshold)
        {
            this.shape2Exists = true;
        }

        if(this.shape2Exists)
        {
            this.drawShape2();
        }

        if(this.shape2Width > width * 2)
        {
            this.shape2Width = 1;
            this.shape2Exists = false;
        }

        if(this.shape2Width > this.threshold)
        {
            this.shape1Exists = true;
        }

        strokeWeight(2);
        point(0, 0);
    }
}