export function getEventIcon(activity: string): string {
  const a = activity.toLowerCase();
  
  // Family
  if (a.includes("family")) return "👨‍👩‍👧‍";

  // Photo & Autograph
  if (a.includes("photo session") || a.includes("group photo")) return "📸";
  if (a.includes("autograph")) return "✍️";
  
  // Music & Performance
  if (a.includes("karaoke")) return "🎤";
  if (a.includes("live music") || a.includes("band 47") || a.includes("sing")) return "🎵";
  if (a.includes("concert") || a.includes("orchestra") || a.includes("music of") || a.includes("curtis")) return "🎼";
  
  // Parties & Social
  if (a.includes("party") || a.includes("gala") || a.includes("disco")) return "🎉";
  if (a.includes("mixer") || a.includes("meetup") || a.includes("icebreaker")) return "🤝";
  if (a.includes("lgbtqia")) return "🏳️‍🌈";
  
  // Movies & Shows
  if (a.includes("movie") || a.includes("showing") || a.includes("premiere")) return "🎬";
  if (a.includes("welcome show") || a.includes("variety show")) return "🌟";
  if (a.includes("documentary")) return "🎞️";
  
  // Games & Trivia
  if (a.includes("trivia")) return "🧠";
  if (a.includes("game") || a.includes("bingo") || a.includes("scattergories")) return "🎮";
  if (a.includes("poker") || a.includes("blackjack") || a.includes("casino") || a.includes("dabo")) return "🎰";
  if (a.includes("dungeons") || a.includes("d&d")) return "🐉";
  
  // Panels & Talks
  if (a.includes("panel")) return "🎙️";
  if (a.includes("chat") || a.includes("potpourri") || a.includes("hot seat")) return "💬";
  if (a.includes("seminar") || a.includes("science")) return "🔬";
  if (a.includes("book club") || a.includes("reading")) return "📚";
  if (a.includes("podcast")) return "🎧";
  
  // Food & Drink
  if (a.includes("breakfast")) return "🍳";
  if (a.includes("tasting") || a.includes("cocktail") || a.includes("whisky") || a.includes("tequila") || a.includes("sake")) return "🍸";
  if (a.includes("sushi") || a.includes("cupcake") || a.includes("dessert")) return "🍰";
  if (a.includes("behind the bar") || a.includes("bartender")) return "🍹";
  
  // Activities & Fitness
  if (a.includes("yoga")) return "🧘";
  if (a.includes("rock climbing")) return "🧗";
  if (a.includes("pickleball") || a.includes("ping pong")) return "🏓";
  if (a.includes("self defense") || a.includes("tactical")) return "🥋";
  if (a.includes("water wars") || a.includes("pool")) return "💦";
  
  // Special Events
  if (a.includes("costume")) return "👗";
  if (a.includes("renewal of vows")) return "💒";
  if (a.includes("charity") || a.includes("auction")) return "❤️";
  if (a.includes("makeup")) return "💄";
  if (a.includes("improv")) return "🎭";
  if (a.includes("art") || a.includes("gallery") || a.includes("sketch")) return "🎨";
  
  // Ship/Cruise Operations
  if (a.includes("departs") || a.includes("docks") || a.includes("all aboard")) return "🚢";
  if (a.includes("orientation") || a.includes("briefing")) return "📋";
  if (a.includes("desk open") || a.includes("office open") || a.includes("lounge open") || a.includes("store open") || a.includes("gallery open") || a.includes("community room")) return "🚪";
  if (a.includes("merch") || a.includes("trading post")) return "🛍️";
  
  // Trek-specific
  if (a.includes("ferengi") || a.includes("quark")) return "👂";
  if (a.includes("klingon") || a.includes("gorn")) return "⚔️";
  if (a.includes("starfleet academy")) return "🎓";
  if (a.includes("night sky") || a.includes("stargazing")) return "🌌";
  if (a.includes("script reading") || a.includes("table read")) return "📜";
  if (a.includes("love letters")) return "💌";
  if (a.includes("mime")) return "🤐";
  if (a.includes("shakespeare")) return "🎭";
  if (a.includes("friends of bill")) return "☕";
  if (a.includes("cruise collective") || a.includes("assimilation")) return "🖖";
  if (a.includes("cryptic clue") || a.includes("hunt")) return "🔍";
  
  // Default Star Trek
  return "⭐";
}
