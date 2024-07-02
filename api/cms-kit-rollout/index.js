const integrationTypes = {
  sanity: {
    endpoint: 'https://cms-kit-sanity.vercel.app/api/roll-out/assignProject',
    startingSlug:
      '/presentation/landing/36643ba6-5775-4cf5-b729-ccd85c8a3fcc/content[_key=="0Dcomk3aoeUEhIjmxilWE"].components[_key=="kxtZMIADLL3jvZR8xWjFpu"].customRichText[_key=="02a049a37562"].children[_key=="c356d7b11fe90"].text?preview=/home',
  },
};

const defaultIntegration = 'sanity';

export default async function handler(request, response) {
  try {
    if (request.method === 'POST') {
      const body = request.body;
      const { integration = defaultIntegration, email } = body;
      const endpoint = integrationTypes[integration]?.endpoint;

      if (!endpoint) {
        throw new Error('Wrong Integration Type. Check the "project" value');
      }

      const result = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await result.json();
      if (!result.ok) {
        return response
          .status(500)
          .json({ status: result.status, message: result.message, error: data.error });
      }

      const startingUrl = data.projectDetails.studioUrl + integrationTypes[integration].startingSlug;
      data.projectDetails.startingUrl = startingUrl;

      return response.status(200).json(data);
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
