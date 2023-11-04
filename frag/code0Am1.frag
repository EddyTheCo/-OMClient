#version 440
#define PI 3.1415926538
#define LIGHTREP 9
#define SUNCOLOR vec3(1.0, 1.0, 0.0)

#define BLUR 0.02
#define SUNRADIUS 0.3+0.007*sin(3.0*iTime)
#define LIGHTSTART 0.35
#define LIGHTHEIGHT 0.15+0.01*sin(3.0*iTime)
#define LIGHTWIDTH 0.1

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

float sdOrientedBox( in vec2 p, in vec2 a, in vec2 b, float th )
{
    float l = length(b-a);
    vec2  d = (b-a)/l;
    vec2  q = (p-(a+b)*0.5);
    q = mat2(d.x,-d.y,d.y,d.x)*q;
    q = abs(q)-vec2(l,th)*0.5;
    return length(max(q,0.0)) + min(max(q.x,q.y),0.0);
}

void main( void)
{
    vec2 uv=vec2(qt_TexCoord0.x*2.0-1.0,1.0-qt_TexCoord0.y*2.0);
    uv.x *= pixelStep.y/pixelStep.x;

    vec2 p=vec2(0.0);
    float f=Circle(uv,p,SUNRADIUS);

    float angle=2.0*PI/9.0;

    float a=0.0;
    f+=1.0-smoothstep(-BLUR,BLUR,
                      sdOrientedBox(uv,p+LIGHTSTART*vec2(cos(angle*a),sin(angle*a)),
                                    p+(LIGHTSTART+LIGHTHEIGHT)*vec2(cos(angle*a),sin(angle*a)),LIGHTWIDTH));
    a=1.0;
    f+=1.0-smoothstep(-BLUR,BLUR,
                      sdOrientedBox(uv,p+LIGHTSTART*vec2(cos(angle*a),sin(angle*a)),
                                    p+(LIGHTSTART+LIGHTHEIGHT)*vec2(cos(angle*a),sin(angle*a)),LIGHTWIDTH));

    a=2.0;
    f+=1.0-smoothstep(-BLUR,BLUR,
                      sdOrientedBox(uv,p+LIGHTSTART*vec2(cos(angle*a),sin(angle*a)),
                                    p+(LIGHTSTART+LIGHTHEIGHT)*vec2(cos(angle*a),sin(angle*a)),LIGHTWIDTH));

    a=3.0;
    f+=1.0-smoothstep(-BLUR,BLUR,
                      sdOrientedBox(uv,p+LIGHTSTART*vec2(cos(angle*a),sin(angle*a)),
                                    p+(LIGHTSTART+LIGHTHEIGHT)*vec2(cos(angle*a),sin(angle*a)),LIGHTWIDTH));

    a=4.0;
    f+=1.0-smoothstep(-BLUR,BLUR,
                      sdOrientedBox(uv,p+LIGHTSTART*vec2(cos(angle*a),sin(angle*a)),
                                    p+(LIGHTSTART+LIGHTHEIGHT)*vec2(cos(angle*a),sin(angle*a)),LIGHTWIDTH));

    a=5.0;
    f+=1.0-smoothstep(-BLUR,BLUR,
                      sdOrientedBox(uv,p+LIGHTSTART*vec2(cos(angle*a),sin(angle*a)),
                                    p+(LIGHTSTART+LIGHTHEIGHT)*vec2(cos(angle*a),sin(angle*a)),LIGHTWIDTH));
    a=6.0;
    f+=1.0-smoothstep(-BLUR,BLUR,
                      sdOrientedBox(uv,p+LIGHTSTART*vec2(cos(angle*a),sin(angle*a)),
                                    p+(LIGHTSTART+LIGHTHEIGHT)*vec2(cos(angle*a),sin(angle*a)),LIGHTWIDTH));
    a=7.0;
    f+=1.0-smoothstep(-BLUR,BLUR,
                      sdOrientedBox(uv,p+LIGHTSTART*vec2(cos(angle*a),sin(angle*a)),
                                    p+(LIGHTSTART+LIGHTHEIGHT)*vec2(cos(angle*a),sin(angle*a)),LIGHTWIDTH));
    a=8.0;
    f+=1.0-smoothstep(-BLUR,BLUR,
                      sdOrientedBox(uv,p+LIGHTSTART*vec2(cos(angle*a),sin(angle*a)),
                                    p+(LIGHTSTART+LIGHTHEIGHT)*vec2(cos(angle*a),sin(angle*a)),LIGHTWIDTH));


    f = clamp(f,0.0,1.0);

    vec3 fcolor=SUNCOLOR*f;

    vec4 bcolor=texture(src, uv).rgba;
    fragColor=mix(bcolor, vec4(fcolor,1.0), f);


}

