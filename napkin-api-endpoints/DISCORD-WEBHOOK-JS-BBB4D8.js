/**
* @param {NapkinRequest} req
* @param {NapkinResponse} res
*/
export default async (req, res) => {

  const { email, firstName, lastName, organization, title } = req.body

  let content = 'A new person might be interested in Solana! '

  if (firstName) {
    if (lastName) {
      content += ` Their name is **${firstName} ${lastName}**.`
    }
    else 
      content += ` Their name is **${firstName}**.`
  }

  if (email) content += ` Their email is **${email}**.`
  
  if (organization) {
    if (title) {
      content += ` They work as a(n) **${title}** at **${organization}**.`
    }
    else content += ` They work at **${organization}**`
  }

  await fetch(process.env.WEBHOOK_URL, {
    method: 'POST',
    body: JSON.stringify({
      content,
    }),
    headers: {
        "Content-Type": "application/json"
      }
  })

  console.log("Message sent. Check Discord.")
}
