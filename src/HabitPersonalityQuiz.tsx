// src/HabitPersonalityQuiz.tsx
import React, { useState } from "react";
import { Heart, AlertCircle, Target, Sparkles, Calendar } from "lucide-react";

// ===== 型定義 =====
type AnswerType = "perfectionist" | "approval" | "anxiety" | "planning";

type Option = { text: string; type: AnswerType };
type Question = { q: string; options: Option[] };

type ResultInfo = {
  title: string;
  icon: JSX.Element;
  description: string;
  reason: string;
  ngStudy: string[];
  okStudy: string[];
  advice: string;
  color: string;
};

const questions: Question[] = [
  {
    q: "勉強を始める前、一番気になることは?",
    options: [
      { text: "完璧な計画を立てられるか", type: "perfectionist" },
      { text: "誰かに応援してもらえるか", type: "approval" },
      { text: "本当に続けられるか不安", type: "anxiety" },
      { text: "何から始めればいいか分からない", type: "planning" },
    ],
  },
  {
    q: "過去に勉強が続かなかった理由は?",
    options: [
      { text: "思い通りにできず、やる気を失った", type: "perfectionist" },
      { text: "頑張りを誰も見てくれなかった", type: "approval" },
      { text: "自分には無理だと思ってしまった", type: "anxiety" },
      { text: "計画が崩れて混乱した", type: "planning" },
    ],
  },
  {
    q: "勉強中に一番テンションが上がる瞬間は?",
    options: [
      { text: "予定通りに進められた時", type: "perfectionist" },
      { text: "SNSで「いいね」をもらった時", type: "approval" },
      { text: "少しでも理解できた実感がある時", type: "anxiety" },
      { text: "やるべきことが明確な時", type: "planning" },
    ],
  },
  {
    q: "疲れて勉強できなかった翌日、あなたは?",
    options: [
      { text: "「計画が狂った」と落ち込む", type: "perfectionist" },
      { text: "「また続かなかった」と自分を責める", type: "anxiety" },
      { text: "「誰も見てないし、いいか」と諦める", type: "approval" },
      { text: "「どうリカバリーすればいいか」と悩む", type: "planning" },
    ],
  },
  {
    q: "理想の勉強スタイルは?",
    options: [
      { text: "毎日同じ時間に同じ量を淡々と", type: "perfectionist" },
      { text: "勉強仲間と報告し合いながら", type: "approval" },
      { text: "その日の気分で無理なく", type: "anxiety" },
      { text: "週単位で目標を立ててクリアしていく", type: "planning" },
    ],
  },
  {
    q: "「今日はもう無理…」と思った時、どうする?",
    options: [
      { text: "0か100かなので、やらない", type: "perfectionist" },
      { text: "誰かに「頑張って」と言われたらやる", type: "approval" },
      { text: "「やっぱり私はダメだ」と落ち込む", type: "anxiety" },
      { text: "明日の計画を考え直す", type: "planning" },
    ],
  },
  {
    q: "勉強を続けるために一番欲しいものは?",
    options: [
      { text: "完璧な学習計画とスケジュール", type: "perfectionist" },
      { text: "応援してくれる仲間や先生", type: "approval" },
      { text: "「私でもできる」という自信", type: "anxiety" },
      { text: "迷わず進める明確な指示", type: "planning" },
    ],
  },
];

const resultTypes: Record<AnswerType, ResultInfo> = {
  perfectionist: {
    title: "完璧主義タイプ",
    icon: <Target className="w-16 h-16 text-purple-500" />,
    description: "「ちゃんとやらなきゃ」が口癖のあなた",
    reason:
      "計画通りにいかないと、全てが台無しに感じてしまい、0か100かの思考で挫折しがち。",
    ngStudy: [
      "❌ 毎日2時間の固定スケジュール",
      "❌ 完璧なノート作りから始める",
      "❌ 「1日でもサボったら意味がない」思考",
    ],
    okStudy: [
      "✅ 「最低ライン」を設定(5分でもOK)",
      "✅ 80点主義で進める(100点を目指さない)",
      "✅ 「できた日」だけをカウントする",
    ],
    advice: "完璧を目指さず、「続けること」を最優先に。1分でも机に向かえたら花丸です!",
    color: "bg-purple-50 border-purple-200",
  },
  approval: {
    title: "承認欲求タイプ",
    icon: <Heart className="w-16 h-16 text-pink-500" />,
    description: "「誰かに見てもらいたい」が原動力のあなた",
    reason:
      "一人だとモチベーションが続かず、褒められないと頑張れない。SNSの反応に一喜一憂しがち。",
    ngStudy: [
      "❌ 完全に一人で黙々と勉強",
      "❌ 成果が見えにくい学習法",
      "❌ 誰にも報告しない秘密の勉強",
    ],
    okStudy: [
      "✅ 勉強記録をSNSやLINEでシェア",
      "✅ 週1回の報告タイムを作る",
      "✅ 「見守られている」環境を作る",
    ],
    advice:
      "あなたの頑張りを見てくれる人を確保しましょう。コーチングはあなたのための応援団です!",
    color: "bg-pink-50 border-pink-200",
  },
  anxiety: {
    title: "自己否定タイプ",
    icon: <AlertCircle className="w-16 h-16 text-blue-500" />,
    description: "「どうせ私には無理」が心の声のあなた",
    reason:
      "少しの失敗で自分を責め、「やっぱりダメだ」と諦めてしまう。自己否定ループで挫折。",
    ngStudy: ["❌ 高すぎる目標設定", "❌ 「できなかったこと」を記録する", "❌ 他人と比較する"],
    okStudy: [
      "✅ 超小さな目標からスタート(5分読書など)",
      "✅ 「できたこと」だけを記録",
      "✅ 過去の自分とだけ比較する",
    ],
    advice:
      "「できない自分」ではなく、「少しずつできる自分」に注目を。小さな成功を積み重ねましょう!",
    color: "bg-blue-50 border-blue-200",
  },
  planning: {
    title: "計画倒れタイプ",
    icon: <Calendar className="w-16 h-16 text-green-500" />,
    description: "「計画は完璧、でも実行できない」あなた",
    reason:
      "計画を立てるのは得意だけど、予定が崩れると混乱。リカバリー方法が分からず挫折。",
    ngStudy: [
      "❌ 緻密すぎる長期計画",
      "❌ 予備日のない固定スケジュール",
      "❌ 計画通りにいかないとパニック",
    ],
    okStudy: [
      "✅ 週単位のゆるい計画",
      "✅ 必ず「予備日」を設ける",
      "✅ 計画の修正を前提にする",
    ],
    advice:
      "計画は「目安」であって「絶対」ではありません。柔軟に調整しながら進みましょう!",
    color: "bg-green-50 border-green-200",
  },
};

const HabitPersonalityQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<AnswerType[]>([]);
  const [result, setResult] = useState<AnswerType | null>(null);

  const handleAnswer = (type: AnswerType) => {
    const newAnswers = [...answers, type];
    setAnswers(newAnswers);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((q) => q + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: AnswerType[]) => {
    const counts: Record<AnswerType, number> = {
      perfectionist: 0,
      approval: 0,
      anxiety: 0,
      planning: 0,
    };
    finalAnswers.forEach((t) => (counts[t] += 1));
    const maxType = (Object.keys(counts) as AnswerType[]).reduce((a, b) =>
      counts[a] >= counts[b] ? a : b
    );
    setResult(maxType);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  };

  if (result) {
    const resultData = resultTypes[result];
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 p-4 sm:p-8">
        <div className="max-w-2xl mx-auto">
          <div className={`${resultData.color} border-2 rounded-3xl p-8 shadow-lg`}>
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">{resultData.icon}</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">あなたは…</h2>
              <div className="text-4xl font-bold text-gray-900 mb-4">{resultData.title}</div>
              <p className="text-lg text-gray-600 italic">{resultData.description}</p>
            </div>

            <div className="space-y-6 mt-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2 text-red-500" />
                  あなたが挫折してしまう理由
                </h3>
                <p className="text-gray-700 leading-relaxed">{resultData.reason}</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-3">⚠️ やってはいけない勉強法</h3>
                <ul className="space-y-2">
                  {resultData.ngStudy.map((item, i) => (
                    <li key={i} className="text-gray-700">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-3">✨ あなたが続けられる勉強法</h3>
                <ul className="space-y-2">
                  {resultData.okStudy.map((item, i) => (
                    <li key={i} className="text-gray-700 font-medium">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-r from-orange-100 to-pink-100 rounded-xl p-6 shadow-sm border-2 border-orange-200">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-orange-500" />
                  コーチからのアドバイス
                </h3>
                <p className="text-gray-800 leading-relaxed font-medium">{resultData.advice}</p>
              </div>
            </div>

            <div className="mt-8 text-center space-y-4">
              <button
                onClick={resetQuiz}
                className="bg-white text-gray-700 px-8 py-3 rounded-full font-bold hover:bg-gray-50 transition shadow-md"
              >
                もう一度診断する
              </button>
              <p className="text-sm text-gray-600 mt-4">
                💡 この診断結果をスクショして、勉強垢でシェアしてみよう!
                <br />
                あなたに合った習慣化のコツが見つかります。
              </p>
            </div>
          </div>

          <div className="mt-8 text-center bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold text-xl text-gray-800 mb-3">🎁 公式LINE登録者限定特典</h3>
            <p className="text-gray-700 mb-4">
              この診断はほんの入口。
              <br />
              あなたに合った習慣化プランを一緒に作りませんか?
            </p>
            <button className="bg-gradient-to-r from-orange-400 to-pink-400 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition">
              公式LINEで無料相談してみる
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">三日坊主脱出診断</h1>
          <p className="text-gray-600 text-lg">たった7問で分かる、あなたが挫折してしまう"本当の理由"</p>
          <div className="mt-4 flex justify-center space-x-2">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`h-2 w-8 rounded-full ${i <= currentQuestion ? "bg-orange-400" : "bg-gray-200"}`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            質問 {currentQuestion + 1} / {questions.length}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-orange-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {questions[currentQuestion].q}
          </h2>
          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, i) => (
              <button
                key={`${currentQuestion}-${i}`}
                onClick={() => handleAnswer(option.type)}
                className="w-full bg-gradient-to-r from-orange-50 to-pink-50 hover:from-orange-100 hover:to-pink-100 text-gray-800 p-5 rounded-2xl font-medium text-left transition shadow-sm hover:shadow-md border-2 border-orange-100"
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          ✨ 正直に答えることで、より正確な結果が得られます
        </p>
      </div>
    </div>
  );
};

export default HabitPersonalityQuiz;
