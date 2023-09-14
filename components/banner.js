// if we have no room id then  something should be show on screen
export default () => {
  return (
    <div className="flex justify-center items-center pt-52">
      <div className="text-center title">
        <span className="text-md text-gray-300">Introducing</span>
        <h1 className="text-7xl text-gray-200  font-bold">OpenAI Model</h1>
        <p className="w-3/4 mx-auto py-5  text-gray-400">
          OpenAI is focused on developing artificial general intelligence (AGI),
          which is a type of AI that can think and reason like a human. OpenAI's
          research focuses on developing AI systems that can learn from
          experience and solve complex tasks.
        </p>
      </div>
    </div>
  );
};
