const endpoints = {
  'cms-kit-sanity': 'https://cms-kit-sanity.vercel.app/api/roll-out',
};

const defaultProject = 'cms-kit-sanity';

export default async function handler(request, response) {
  try {
    if (request.method === 'POST') {
      const body = request.body;
      const { project = defaultProject, email } = body;
      const endpoint = endpoints[project];

      const result = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!result.ok) {
        const data = await result.json();
        return response
          .status(500)
          .json({ status: result.status, message: result.statusText, error: data.error });
      }

      console.log('🚀 ~ handler ~ data:', data);

      return response.status(200).json({ message: 'Data received successfully', data });
    } else if (request.method === 'GET') {
      const status = {
        status: 'OK',
      };
      return response.status(200).json(status);
    } else {
      return response.status(405).json({ message: 'Only POST and GET requests are allowed' });
    }
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
