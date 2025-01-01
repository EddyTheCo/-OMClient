#version 440
#define PI 3.1415926538
#define LIGHTREP 9
#define SUNCOLOR vec3(1.0, 1.0, 0.0)
#define WATERCOLOR vec3(0.4470588235294118, 0.7529411764705882, 0.8705882352941177)
#define GRAYCLOUD vec3(0.8470588235294118)
#define BLUR 0.02
#define SUNR1 0.2
#define SUNR2 0.25
#define SUNR3 0.35
#define SUNW  0.35

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

float sun(float r, float a)
{
    float f= smoothstep(SUNR2-BLUR,SUNR2,r) - smoothstep(SUNR3+0.01*sin(2.0*iTime)-BLUR,SUNR3+0.01*sin(2.0*iTime),r);
    f*= smoothstep(0.0,BLUR,-2.0*SUNW+sin(LIGHTREP*a+iTime));
    f+=1.0-smoothstep(SUNR1-BLUR,SUNR1,r);
    return f;
}

float sdRoundedBox( in vec2 p, in vec2 b, in vec4 r )
{
    r.xy = (p.x>0.0)?r.xy : r.zw;
    r.x  = (p.y>0.0)?r.x  : r.y;
    vec2 q = abs(p)-b+r.x;
    return min(max(q.x,q.y),0.0) + length(max(q,0.0)) - r.x;
}
float cloud(vec2 uv, vec2 p,float width,float height)
{
    float f=1.0-smoothstep(0.0,BLUR,
                           sdRoundedBox(uv-p,vec2(width,height/2.5),vec4(min(width,height)*0.4)));
    f+=Circle(uv,p+vec2(-width*0.33,height/2.1),width/2.2);
    f+=Circle(uv,p+vec2(width*0.33,height/2.1),width/2.9);
    return clamp(f,0.0,1.0);
}

float sdUnevenCapsule( vec2 p, float r1, float r2, float h )
{
    p.x = abs(p.x);
    float b = (r1-r2)/h;
    float a = sqrt(1.0-b*b);
    float k = dot(p,vec2(-b,a));
    if( k < 0.0 ) return length(p) - r1;
    if( k > a*h ) return length(p-vec2(0.0,h)) - r2;
    return dot(p, vec2(a,b) ) - r1;
}

void main( void)
{
    vec2 uv=vec2(qt_TexCoord0.x*2.0-1.0,1.0-qt_TexCoord0.y*2.0);
    uv.x *= pixelStep.y/pixelStep.x;

    float fday=sun(length(uv)*2.0,atan(uv.x,uv.y));
    fday = clamp(fday,0.0,1.0);

    float fcloud=cloud(uv,vec2(-0.15,-0.2)+
                  vec2(0.01*sin(3.0*iTime),0.0),0.3,0.3);
    fcloud+=cloud(uv,vec2(0.3,-0.05)+
                  vec2(0.01*cos(3.0*iTime),0.0),0.3,0.3);
    fcloud=clamp(0.0,1.0,fcloud);

    float fdrop=1.0-smoothstep(-0.01,0.01,sdUnevenCapsule(uv-vec2(0.1,-0.4+0.15*sin(2.5*iTime)),0.03,0.01,0.04));
    fdrop+=1.0-smoothstep(-0.01,0.01,sdUnevenCapsule(uv-vec2(-0.0,-0.4+0.15*sin(2.8*iTime)),0.03,0.01,0.04));
    fdrop+=1.0-smoothstep(-0.01,0.01,sdUnevenCapsule(uv-vec2(-0.1,-0.4+0.15*sin(3.1*iTime)),0.03,0.01,0.04));
    fdrop+=1.0-smoothstep(-0.01,0.01,sdUnevenCapsule(uv-vec2(-0.2,-0.4+0.15*sin(3.2*iTime)),0.03,0.01,0.04));
    fdrop+=1.0-smoothstep(-0.01,0.01,sdUnevenCapsule(uv-vec2(0.2,-0.4+0.15*sin(3.1*iTime)),0.03,0.01,0.04));
    fdrop+=1.0-smoothstep(-0.01,0.01,sdUnevenCapsule(uv-vec2(0.3,-0.4+0.15*sin(3.3*iTime)),0.03,0.01,0.04));
    vec3 daycolor=SUNCOLOR*fday;
    vec3 cloud= GRAYCLOUD*fcloud;
    vec3 drop=WATERCOLOR*fdrop;

    vec3 fcolor=mix(drop,cloud,fcloud);
    fcolor= mix(daycolor,fcolor,clamp(0.0,1.0,fcloud+fdrop));
    vec4 bcolor=texture(src, uv).rgba;
    fragColor=mix(bcolor, vec4(fcolor,1.0), clamp(0.0,1.0,fcloud+fdrop+fday));
}

