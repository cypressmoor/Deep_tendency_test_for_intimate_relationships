import { useState } from "react";

const questions = [
  { en: "When something feels off between us, I'd rather be the one to name it first.", zh: "如果我们之间有什么不对劲，我更倾向于先开口说出来。", dim: "D", reverse: false },
  { en: "Being told exactly what to do — in the right moment — feels like relief, not loss of control.", zh: "在某些时刻，被人明确地告诉"该怎么做"，感觉更像是一种释然，而不是失控。", dim: "S", reverse: false },
  { en: "I prefer to be the one who sets the pace, even if I pretend to follow.", zh: "我更喜欢自己来定节奏，哪怕表面上是在跟着对方走。", dim: "D", reverse: false },
  { en: "I enjoy giving more than I enjoy receiving.", zh: "在亲密关系里，我给予的时候比被给予时更享受。", dim: "A", reverse: false },
  { en: "I need to fully trust someone before I let them see me undone.", zh: "我需要完全信任一个人之后，才能让对方看到我失控或崩掉的样子。", dim: "T", reverse: false },
  { en: "Sometimes I say no just to see what the other person does next.", zh: "有时候我说"不"，其实是想看看对方接下来怎么做。", dim: "Bi", reverse: false },
  { en: "There's something satisfying about yielding — when you've chosen to.", zh: "当你是主动选择退让的时候，顺从本身会带来某种满足感。", dim: "S", reverse: false },
  { en: "I would rather initiate than wait.", zh: "我更愿意主动出击，而不是等待。", dim: "D", reverse: false },
  { en: "Being watched closely — even assessed — doesn't unsettle me. It's attention.", zh: "被人仔细审视——甚至被评判——不会让我不安。那也是一种关注。", dim: "P", reverse: false },
  { en: "The best moments happen when I let go of being in charge.", zh: "最好的时刻，往往发生在我放下掌控感的时候。", dim: "S", reverse: false },
  { en: "I find it easier to open up to someone who doesn't push too hard.", zh: "如果对方不会用力逼近，我反而更容易打开自己。", dim: "T", reverse: false },
  { en: "I like the idea of being the one someone is waiting for.", zh: "我喜欢那种「对方在等我」的感觉。", dim: "D", reverse: false },
  { en: "There's a kind of power in being completely passive — and knowing it.", zh: "完全被动地接受——同时清醒地知道自己在这样做——本身就是一种权力。", dim: "P", reverse: false },
  { en: "Saying no directly is easier for me than hinting and hoping they'll figure it out.", zh: "直接说"不"，比绕弯暗示然后希望对方明白，对我来说更容易。", dim: "Bd", reverse: false },
  { en: "I'm most myself when someone else is in charge for a while.", zh: "当对方暂时掌控全局的时候，我反而更能做自己。", dim: "S", reverse: false },
  { en: "I tend to give attention before I expect to receive it.", zh: "我通常会先给出关注，而不是先等着被关注。", dim: "A", reverse: false },
  { en: "Resistance — theirs or mine — makes things more interesting, not more complicated.", zh: "无论是他们的抵抗还是我自己的，阻力会让事情更有意思，而不是更麻烦。", dim: "Bi", reverse: false },
  { en: "I can open up completely to a near-stranger, if the chemistry is right.", zh: "如果感觉对，我可以对一个几乎陌生的人毫无保留。", dim: "T", reverse: true },
  { en: "Watching someone else take care of things — and doing it well — is its own kind of pleasure.", zh: "看着别人把事情处理得很好——然后让我什么都不用管——这本身就是一种享受。", dim: "P", reverse: false },
  { en: "My real limits are something I know privately. I don't need to announce them in advance.", zh: "我真正的边界是私下里才知道的那种。不需要提前宣告。", dim: "Bi", reverse: false },
];

const RESULTS = {
  SOVEREIGN: {
    code: "SOVEREIGN", name: "主权者",
    tagline: "You lead from within. The reins are always yours.",
    character: "你不需要宣告控制权，因为它本来就在你手里。你的掌控方式不是命令，而是一种静默的引力——对方跟着你走，但说不清楚是什么时候开始的。你对细节敏感，对节奏敏感，你知道什么时候该推进，什么时候该留白。你的主导欲望不是表演给别人看的，是真实的、向内生长的。",
    intimacy: "在亲密关系里，你是那个设定体验基调的人，但你愿意让对方以为自己在选择。你对顺从者有直觉上的吸引力，对试图反客为主的人会有微妙的抵触。你的表达欲很强，但只在感到完全安全时才会真正敞开。",
    limits: "你的边界不在于"对方能做什么"，而在于"对方是否真的理解你"。被轻视或被忽视，比任何明显的越界更让你关闭。",
    tags: ["主导型", "内敛的控制力", "引力型", "节奏感强", "不轻易示弱"]
  },
  MIRROR: {
    code: "MIRROR", name: "镜中人",
    tagline: "You reflect, adapt, and contain more than anyone guesses.",
    character: "你是那种让人觉得"好像很好懂"、但其实从没被完全看穿的人。你的顺从里有主动性——你在观察，在选择，在决定自己愿意配合到哪一步。被引导对你来说是享受，但前提是你在内心确认过"这个人值得"。你的开放是分层的，每一层都需要用时间和安全感来解锁。",
    intimacy: "你在亲密关系里能给出极大的温柔和配合，但这份配合不是无条件的——它建立在你私下的评估之上。你不会用言语宣告边界，而是用反应的温度来传达。你最享受的状态是：被看见，被好好对待，然后可以完全不用负责任地放松下来。",
    limits: "被人"当工具"使用会彻底关上你的门，即使对方没有意识到自己在这样做。你的退出往往是无声的，但一旦决定，就不太可能回头。",
    tags: ["层层解锁型", "被动中的主动", "信任驱动", "观察者", "温柔有锋"]
  },
  ARCHITECT: {
    code: "ARCHITECT", name: "设计者",
    tagline: "You give freely — but always on your own terms.",
    character: "你的给予欲望是真实的，但它不是软弱，而是一种精准的主动性。你享受让对方感受到你的注意力和照料，但你非常清楚自己在做什么。你会主动出击，但很少盲目；你会打开自己，但是按照自己设计好的方式。你是那种"先给出再要求"的人，但对方最好不要把这当作理所当然。",
    intimacy: "在亲密关系里，你最自然的状态是照料者兼导演——你知道对方想要什么，然后以自己的方式给出来。你不太需要被命令，但你会欣赏一个能偶尔让你"被动一下"的人。你的边界会直接说出来，不拐弯。",
    limits: "你接受引导，但拒绝被控制。你允许对方进入，但最终的开关一直在你这里。",
    tags: ["主动给予型", "清醒的开放", "直接表达边界", "照料者", "设计感强"]
  },
  CURRENT: {
    code: "CURRENT", name: "暗流",
    tagline: "You flow under the surface. Still, but not still at all.",
    character: "你看起来随和，甚至有点被动，但你内部有一条非常清晰的线。你不会急着表达，不会急着推进，但你知道自己想要什么，也知道什么越界了。你的"不"不一定是一句话，可能是一个降温，一个距离，一个突然变少的回应。你测试对方的方式很隐蔽，但测试从来没有停过。",
    intimacy: "你在亲密关系里需要一个能"读懂沉默"的人。你给出的信号是细的、是需要被认真对待的。你享受被动接受，但你无法忍受对方不在乎你的感受。你一旦真正信任一个人，会以一种让对方意外的方式完全打开——但这个时刻到来之前，可能需要等很久。",
    limits: "表面上看你没什么边界，但实际上你的边界是整个人——你只是不说出来。被误读、被粗糙对待，是最深的伤。",
    tags: ["暗流型", "延迟开放", "信号细腻", "隐性边界", "需要被看懂"]
  }
};

function computeResult(answers) {
  let scores = { D:0, S:0, A:0, P:0, T:0, Bi:0, Bd:0 };
  let counts = { D:0, S:0, A:0, P:0, T:0, Bi:0, Bd:0 };
  questions.forEach((q, i) => {
    let score = answers[i] - 1;
    if (q.reverse) score = 6 - score;
    const agree = 6 - score;
    scores[q.dim] += agree;
    counts[q.dim]++;
  });
  const n = k => counts[k] > 0 ? scores[k] / (counts[k] * 6) : 0;
  const D=n("D"), S=n("S"), A=n("A"), P=n("P"), T=n("T"), Bi=n("Bi"), Bd=n("Bd");
  const all = [
    { key:"SOVEREIGN", val: D*2 + Bd*1.5 - T*0.5 },
    { key:"ARCHITECT", val: A*2 + D*1 + Bd*1.2 - S*0.3 },
    { key:"MIRROR",    val: S*2 + T*1.5 + P*1 - Bi*0.3 },
    { key:"CURRENT",   val: T*2 + Bi*1.8 + S*1 + P*0.8 - Bd*0.5 },
  ];
  return all.sort((a,b) => b.val-a.val)[0].key;
}

const SIZES = [18,22,26,30,34,38,42];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  body{background:#F7F6F4;font-family:-apple-system,'PingFang SC','Helvetica Neue',sans-serif;}
`;

export default function App() {
  const [phase, setPhase] = useState("start"); // start | quiz | result
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState(Array(20).fill(null));
  const [resultKey, setResultKey] = useState(null);

  const pct = phase === "result" ? 100 : phase === "start" ? 0 : (idx / questions.length) * 100;
  const cur = answers[idx];

  function select(val) {
    setAnswers(a => { const n=[...a]; n[idx]=val; return n; });
  }

  function next() {
    if (cur === null) return;
    if (idx === questions.length - 1) {
      setResultKey(computeResult([...answers.slice(0,idx), cur, ...answers.slice(idx+1)]));
      setPhase("result");
    } else {
      setIdx(i => i+1);
    }
  }

  function back() { if (idx > 0) setIdx(i => i-1); }

  function retry() {
    setPhase("start"); setIdx(0); setAnswers(Array(20).fill(null)); setResultKey(null);
  }

  const r = resultKey ? RESULTS[resultKey] : null;

  return (
    <div style={{minHeight:"100vh",background:"#F7F6F4",display:"flex",flexDirection:"column",alignItems:"center"}}>
      <style>{css}</style>

      {/* Progress bar */}
      <div style={{position:"fixed",top:0,left:0,right:0,height:3,background:"rgba(26,26,46,0.08)",zIndex:100}}>
        <div style={{height:"100%",background:"#1A1A2E",width:`${pct}%`,transition:"width 0.4s ease"}}/>
      </div>

      {/* Header */}
      <div style={{width:"100%",maxWidth:660,padding:"52px 24px 8px",textAlign:"center"}}>
        <div style={{fontSize:11,letterSpacing:"0.28em",textTransform:"uppercase",color:"#C9A96E",fontWeight:600,marginBottom:12}}>Depth of Intimacy</div>
        <h1 style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:"clamp(26px,5vw,38px)",fontWeight:700,color:"#1A1A2E",lineHeight:1.2}}>亲密深层倾向测试</h1>
        <p style={{marginTop:12,fontSize:14,color:"#9B9B9B",lineHeight:1.7}}>没有对错，只有真实。请用直觉作答，不要想太久。</p>
      </div>

      <div style={{width:"100%",maxWidth:660,padding:"16px 24px 80px",flex:1}}>

        {/* START */}
        {phase === "start" && (
          <div style={{textAlign:"center",paddingTop:24}}>
            <div style={{display:"flex",justifyContent:"center",gap:36,margin:"28px 0"}}>
              {[["20","题目"],["4","结果类型"],["5'","所需时间"]].map(([n,l])=>(
                <div key={l} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                  <span style={{fontSize:28,fontFamily:"Georgia,serif",fontWeight:700,color:"#1A1A2E"}}>{n}</span>
                  <span style={{fontSize:11,letterSpacing:"0.1em",color:"#9B9B9B",textTransform:"uppercase"}}>{l}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setPhase("quiz")}
              style={{padding:"16px 48px",borderRadius:100,fontSize:15,fontWeight:600,letterSpacing:"0.08em",background:"#1A1A2E",color:"white",border:"none",cursor:"pointer"}}
            >
              开始测试 · Begin
            </button>
          </div>
        )}

        {/* QUIZ */}
        {phase === "quiz" && (
          <div>
            <div style={{fontSize:11,letterSpacing:"0.22em",textTransform:"uppercase",color:"#9B9B9B",textAlign:"center",marginBottom:24,fontWeight:500}}>
              Question {idx+1} of {questions.length}
            </div>
            <div style={{background:"white",borderRadius:16,boxShadow:"0 2px 24px rgba(26,26,46,0.08)",padding:"40px 36px 36px"}}>
              <div style={{fontFamily:"Georgia,'Times New Roman',serif",fontSize:"clamp(17px,3.5vw,21px)",fontWeight:700,lineHeight:1.5,color:"#1A1A2E",marginBottom:10}}>
                {questions[idx].en}
              </div>
              <div style={{fontSize:13,color:"#9B9B9B",lineHeight:1.6,marginBottom:36}}>
                {questions[idx].zh}
              </div>

              {/* Scale labels */}
              <div style={{display:"flex",justifyContent:"space-between",fontSize:10,letterSpacing:"0.15em",textTransform:"uppercase",color:"#9B9B9B",fontWeight:600,marginBottom:8}}>
                <span style={{color:"#1A1A2E"}}>AGREE 同意</span>
                <span>DISAGREE 不同意</span>
              </div>

              {/* Circles */}
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"4px 0"}}>
                {SIZES.map((size, vi) => {
                  const val = vi + 1;
                  const selected = answers[idx] === val;
                  return (
                    <button
                      key={val}
                      onClick={() => select(val)}
                      style={{background:"none",border:"none",cursor:"pointer",padding:6,display:"flex",alignItems:"center",justifyContent:"center",flex:1,outline:"none"}}
                    >
                      <div style={{
                        width:size, height:size, borderRadius:"50%",
                        border: selected ? "none" : "2px solid #D0CEC9",
                        background: selected ? "#1A1A2E" : "transparent",
                        transition:"all 0.2s cubic-bezier(.34,1.56,.64,1)",
                        transform: selected ? "scale(1.08)" : "scale(1)",
                      }}/>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Nav */}
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:28,gap:12}}>
              <button
                onClick={back}
                style={{padding:"12px 24px",borderRadius:100,fontSize:13,fontWeight:600,background:"transparent",border:"1.5px solid #E0DEDB",color: idx===0?"transparent":"#9B9B9B",cursor:idx===0?"default":"pointer",pointerEvents:idx===0?"none":"auto"}}
              >← Back</button>
              <button
                onClick={next}
                disabled={answers[idx]===null}
                style={{padding:"12px 28px",borderRadius:100,fontSize:13,fontWeight:600,background:answers[idx]===null?"#D0CEC9":"#1A1A2E",color:"white",border:"none",cursor:answers[idx]===null?"default":"pointer",flex:1,maxWidth:200,transition:"all 0.18s"}}
              >{idx===questions.length-1?"See Result →":"Next →"}</button>
            </div>
          </div>
        )}

        {/* RESULT */}
        {phase === "result" && r && (
          <div style={{background:"white",borderRadius:16,boxShadow:"0 2px 24px rgba(26,26,46,0.08)",overflow:"hidden"}}>
            <div style={{background:"#1A1A2E",color:"white",padding:"48px 36px 36px",textAlign:"center"}}>
              <div style={{fontFamily:"Georgia,serif",fontSize:"clamp(36px,8vw,52px)",fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",lineHeight:1,marginBottom:12}}>{r.code}</div>
              <div style={{fontSize:"clamp(18px,4vw,24px)",fontWeight:400,letterSpacing:"0.06em",color:"#e8d5b0",marginBottom:8}}>{r.name}</div>
              <div style={{fontSize:13,color:"rgba(255,255,255,0.55)",lineHeight:1.6,maxWidth:400,margin:"0 auto"}}>{r.tagline}</div>
            </div>

            <div style={{padding:36,display:"flex",flexDirection:"column",gap:24}}>
              {[
                ["性格描述 · Character", r.character],
                ["在亲密关系里 · In Intimacy", r.intimacy],
                ["你的边界 · Your Limits", r.limits],
              ].map(([label, text]) => (
                <div key={label}>
                  <div style={{fontSize:10,letterSpacing:"0.25em",textTransform:"uppercase",color:"#C9A96E",fontWeight:600,marginBottom:8}}>{label}</div>
                  <p style={{fontSize:14,lineHeight:1.8,color:"#3a3a52"}}>{text}</p>
                  <div style={{height:1,background:"#F0EEE9",marginTop:24}}/>
                </div>
              ))}

              <div>
                <div style={{fontSize:10,letterSpacing:"0.25em",textTransform:"uppercase",color:"#C9A96E",fontWeight:600,marginBottom:12}}>标签 · Tags</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                  {r.tags.map(t => (
                    <span key={t} style={{padding:"5px 14px",borderRadius:100,fontSize:12,fontWeight:500,background:"#F7F6F4",color:"#1A1A2E",border:"1px solid #E5E3DF"}}>{t}</span>
                  ))}
                </div>
              </div>
            </div>

            <div style={{textAlign:"center",padding:"0 36px 36px"}}>
              <button
                onClick={retry}
                style={{background:"transparent",color:"#9B9B9B",border:"1.5px solid #E0DEDB",padding:"10px 24px",borderRadius:100,fontSize:12,letterSpacing:"0.1em",cursor:"pointer",fontWeight:600}}
              >再测一次 · Retry</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
