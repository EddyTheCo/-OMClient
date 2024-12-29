#version 440
#define PI 3.1415926538
#define LIGHTREP 9
#define SUNCOLOR vec3(1.0, 1.0, 0.0)
#define TRUNKCOLOR vec3(0.43529411, 0.3176470588235294, 0.18823529)
#define LEAFCOLOR vec3(0.5215686274509804, 0.721568627, 0.345098039)
#define WHITECLOUD vec3(0.95, 0.95, 0.95)
#define BLUR 0.02


layout(location = 0) in vec2 qt_TexCoord0;
layout(location = 0) out vec4 fragColor;

layout(std140, binding = 0) uniform buf {
    mat4 qt_Matrix;
    float qt_Opacity;
    vec2 pixelStep;
    float iTime;
};
layout(binding = 1) uniform sampler2D src;


float Circle(vec2 uv,vec2 p, float r)
{
    float d = length(uv-p);
    float c = smoothstep(r,r-BLUR,d);
    return c;
}

float moon(vec2 uv, vec2 p,float radius,float angle)
{
    float f=Circle(uv,p,radius);
    f-=Circle(uv,p+0.6*radius*vec2(cos(angle),sin(angle)),radius);
    return clamp(f,0.0,1.0);
}
float sdStar5(in vec2 p, in float r, in float rf)
{
    const vec2 k1 = vec2(0.809016994375, -0.587785252292);
    const vec2 k2 = vec2(-k1.x,k1.y);
    p.x = abs(p.x);
    p -= 2.0*max(dot(k1,p),0.0)*k1;
    p -= 2.0*max(dot(k2,p),0.0)*k2;
    p.x = abs(p.x);
    p.y -= r;
    vec2 ba = rf*vec2(-k1.y,k1.x) - vec2(0,1);
    float h = clamp( dot(p,ba)/dot(ba,ba), 0.0, r );
    return length(p-ba*h) * sign(p.y*ba.x-p.x*ba.y);
}
float sdRoundedBox( in vec2 p, in vec2 b, in vec4 r )
{
    r.xy = (p.x>0.0)?r.xy : r.zw;
    r.x  = (p.y>0.0)?r.x  : r.y;
    vec2 q = abs(p)-b+r.x;
    return min(max(q.x,q.y),0.0) + length(max(q,0.0)) - r.x;
}
float sdSegment( in vec2 p, in vec2 a, in vec2 b )
{
    vec2 pa = p-a, ba = b-a;
    float h = clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0 );
    return length( pa - ba*h );
}
float cloud(vec2 uv, vec2 p,float width,float height)
{
    float f=1.0-smoothstep(0.0,BLUR,
                           sdRoundedBox(uv-p,vec2(width,height/2.5),vec4(min(width,height)*0.4)));
    f+=Circle(uv,p+vec2(-width*0.8,height/4.2),width/5.0);
    f+=Circle(uv,p+vec2(-width*0.12,-height/3.0),width/4.5);
    f+=Circle(uv,p+vec2(-width*0.33,height/4.2),width/4.0);
    f+=Circle(uv,p+vec2(width*0.15,-height/3.0),width/4.0);
    f+=Circle(uv,p+vec2(width*0.85,height/3.5),width/5.0);
    f+=Circle(uv,p+vec2(width*0.55,height/2.5),width/4.5);
    f+=Circle(uv,p+vec2(width*0.40,-height/4.5),width/4.5);
    f+=Circle(uv,p-vec2(width*0.12,-height/3.0),width/4.5);

    return clamp(f,0.0,1.0);
}
float tree (vec2 uv, vec2 p, float width, float height)
{
    float f=1.0 - smoothstep(0.03*width,BLUR,
                           sdSegment(uv-p,vec2(0.0,0.0),vec2(0.0,0.7)*height));
    f+=1.0-smoothstep(0.025*width,BLUR,
                           sdSegment(uv-p,vec2(0.0,0.65*height),vec2(-0.15*width,0.8*height)));
    f+=1.0-smoothstep(0.025*width,BLUR,
                           sdSegment(uv-p,vec2(0.0,0.65*height),vec2(0.15*width,0.8*height)));
    return clamp(f,0.0,1.0);
}
float sdTriangleIsosceles( in vec2 p, in vec2 q )
{
    p.x = abs(p.x);
    vec2 a = p - q*clamp( dot(p,q)/dot(q,q), 0.0, 1.0 );
    vec2 b = p - q*vec2( clamp( p.x/q.x, 0.0, 1.0 ), 1.0 );
    float s = -sign( q.y );
    vec2 d = min( vec2( dot(a,a), s*(p.x*q.y-p.y*q.x) ),
                  vec2( dot(b,b), s*(p.y-q.y)  ));
    return -sqrt(d.x)*sign(d.y);
}
void main( void)
{
    vec2 uv=vec2(qt_TexCoord0.x*2.0-1.0,1.0-qt_TexCoord0.y*2.0);
    uv.x *= pixelStep.y/pixelStep.x;

    vec2 p=vec2(0.0);
    float fsky=moon(uv,vec2(0.17,0.25),0.2+0.007*sin(3.0*iTime),
                 0.6+0.1*sin(3.0*iTime));

    fsky+=1.0-smoothstep(-0.01,0.01,sdStar5(uv-vec2(-0.1,0.3),0.05+0.01*sin(2.0*iTime),0.48));
    fsky+=1.0-smoothstep(-0.01,0.01,sdStar5(uv-vec2(0.3,0.3),0.025/(1.0+abs(sin(1.1*iTime))),0.48));


    float bcloud=cloud(uv,vec2(-0.25,-0.25)+
                  vec2(0.01*cos(3.0*iTime),0.0),0.2,0.1);
    bcloud+=cloud(uv,vec2(0.15,-0.1)+
                  vec2(0.01*cos(iTime),0.0),0.15,0.025);
    bcloud=clamp(0.0,1.0,bcloud);

    float fcloud=cloud(uv,vec2(-0.45,-0.15)+
                        vec2(0.02*cos(1.5*iTime),0.0),0.10,0.025);
    fcloud+=cloud(uv,vec2(0.15,-0.2)+
                        vec2(0.02*cos(2.0*iTime),0.0),0.10,0.025);

    float ftree = tree(uv, vec2(-0.25,-0.3),0.3,0.3);
    ftree += tree(uv, vec2(0.05,-0.25),0.2,0.2);
    float fleaf = 1.0-smoothstep(0.01,0.02,sdTriangleIsosceles(uv-vec2(-0.25,0.18),vec2(0.14,-0.3)));
    fleaf += Circle(uv,vec2(0.05,-0.07),0.1);
    fleaf=clamp(0.0,1.0,fleaf);

    vec3 sky=SUNCOLOR*fsky;
    vec3 cloudback=WHITECLOUD*bcloud;
    vec3 tree = TRUNKCOLOR*ftree;
    vec3 leaf=LEAFCOLOR*fleaf;
    vec3 cloudfront=WHITECLOUD*fcloud;


    vec3 fcolor=mix(sky,cloudback,bcloud);
    fcolor= mix(tree,fcolor,clamp(0.0,1.0,bcloud+fsky));
    fcolor= mix(leaf,fcolor,clamp(0.0,1.0,bcloud+fsky+ftree));
    fcolor= mix(cloudfront,fcolor,clamp(0.0,1.0,bcloud+fsky+ftree+fleaf));

    vec4 bcolor=texture(src, uv).rgba;
    fragColor=mix(bcolor, vec4(fcolor,1.0), clamp(0.0,1.0,bcloud+fcloud+fsky+ftree+fleaf));



}

