import { ConfigWrapper, Profiles, Events } from "klaviyo-api";
import { uuid } from 'uuidv4';

/**
 * @param {NapkinRequest} req
 * @param {NapkinResponse} res
 */
export default async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Add any additional headers as needed
    res.status(200); // Send a 200 response
    return;
  }

  if (!process.env["KLAVIYO_PRIVATE_API_KEY"]) {
    throw new Error(
      "KLAVIYO_PRIVATE_API_KEY with events:read permissions must be set as an environment variable"
    );
  }
  ConfigWrapper(process.env["KLAVIYO_PRIVATE_API_KEY"]);

  const email = req.body.email
  const searchedFor = req.body.searched_for

  const eventBody = {
    data: {
      type: "event",
      attributes: {
        properties: {
          action: "Searched Crypto",
          SearchedFor: searchedFor
        },
        metric: {
          data: {
            type: "metric",
            attributes: {
              name: "Searched Crypto"
            }
          }
        },
        profile: {
          data: {
            type: "profile",
            attributes: {
              email: email
            }
          }
        },
      unique_id: uuid()
      }
    }
  }

  // const eventRes = await Events.createEvent(eventBody);

  const profileRes = await Profiles.getProfiles({ filter: `equals(email,${email})` })
  const profileId = profileRes.data
  const resMessage = `Event created: ${email} searched for ${searchedFor}. Their profile id is ${profileRes}`

  res.json({
    "message": resMessage
  });
};
