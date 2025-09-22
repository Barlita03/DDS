export default class HealthController {
  health(req, res) {
    res.status(200).send("OK");
  }
}
