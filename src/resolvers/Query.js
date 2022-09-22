/**
 * Hello world
 */
async function hello(parent, args, context, info) {
  const arr = [
    {
      isSuccess: true,
      message: "Success query executed",
      exception: "",
      data: {
        message: "Hola",
      },
    },
    {
      isSuccess: true,
      message: "Success query executed",
      exception: "",
      data: {
        message: "Hola",
      },
    },
  ];

  const response = JSON.parse(JSON.stringify(arr));

  return response;
}

module.exports = {
  hello,
};
