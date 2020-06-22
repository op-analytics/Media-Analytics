import jwt from 'jsonwebtoken';

import config from '@/config';
import transport from '@/email';

export default {
  /**
   * Send a validation email to a user
   *
   * @param email - Email of the user to be confirmed
   */
  sendConfirmationEmail(email: string): void {
    // Sign and encode the users email
    jwt.sign({ email }, config.secret, { expiresIn: '1d' }, (_, emailToken) => {
      // Create a url with the signed and encoded email as a path parameter
      const confirmationUrl = `${config.baseURL}/api/auth/confirm/${emailToken}`;
      // Send the user an email with the conformation url as a link
      transport.sendMail({
        to: email,
        subject: 'Confirm email',
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html
          xmlns="http://www.w3.org/1999/xhtml"
          xmlns:o="urn:schemas-microsoft-com:office:office"
        >
          <head>
            <meta charset="UTF-8" />
            <meta content="width=device-width, initial-scale=1" name="viewport" />
            <meta name="x-apple-disable-message-reformatting" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta content="telephone=no" name="format-detection" />
            <title></title>
            <!--[if (mso 16)]>
              <style type="text/css">
                a {
                  text-decoration: none;
                }
              </style>
            <![endif]-->
            <!--[if gte mso 9
              ]><style>
                sup {
                  font-size: 100% !important;
                }
              </style><!
            [endif]-->
            <!--[if gte mso 9]>
              <xml>
                <o:OfficeDocumentSettings>
                  <o:AllowPNG></o:AllowPNG>
                  <o:PixelsPerInch>96</o:PixelsPerInch>
                </o:OfficeDocumentSettings>
              </xml>
            <![endif]-->
            <!--[if !mso]><!-- -->
            <link
              href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i"
              rel="stylesheet"
            />
            <!--<![endif]-->
          </head>
          <body>
            <div class="es-wrapper-color">
              <!--[if gte mso 9]>
                <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                  <v:fill type="tile" color="#2980d9"></v:fill>
                </v:background>
              <![endif]-->
              <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
                <tbody>
                  <tr>
                    <td class="esd-email-paddings" valign="top">
                      <table
                        cellpadding="0"
                        cellspacing="0"
                        class="es-content esd-header-popover"
                        align="center"
                      >
                        <tbody>
                          <tr>
                            <td class="esd-stripe" align="center">
                              <table
                                bgcolor="transparent"
                                class="es-content-body"
                                align="center"
                                cellpadding="0"
                                cellspacing="0"
                                width="600"
                                style="background-color: transparent;"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      class="esd-structure es-p10t es-p10b es-p20r es-p20l"
                                      align="left"
                                    >
                                      <table
                                        cellpadding="0"
                                        cellspacing="0"
                                        width="100%"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              width="560"
                                              class="esd-container-frame"
                                              align="center"
                                              valign="top"
                                            >
                                              <table
                                                cellpadding="0"
                                                cellspacing="0"
                                                width="100%"
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      class="esd-block-text es-infoblock es-m-txt-c es-p25"
                                                      align="center"
                                                    >
                                                      <p>Email Verification</p>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        class="es-content esd-footer-popover"
                        cellspacing="0"
                        cellpadding="0"
                        align="center"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="esd-stripe"
                              align="center"
                              esd-custom-block-id="61183"
                            >
                              <table
                                class="es-content-body"
                                style="background-color: transparent;"
                                width="600"
                                cellspacing="0"
                                cellpadding="0"
                                bgcolor="transparent"
                                align="center"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      class="esd-structure"
                                      style="background-position: center bottom;"
                                      align="left"
                                    >
                                      <table
                                        width="100%"
                                        cellspacing="0"
                                        cellpadding="0"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              class="esd-container-frame"
                                              width="600"
                                              valign="top"
                                              align="center"
                                            >
                                              <table
                                                style="
                                                  background-position: center bottom;
                                                  background-color: #ffffff;
                                                "
                                                width="100%"
                                                cellspacing="0"
                                                cellpadding="0"
                                                bgcolor="#ffffff"
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      class="esd-block-text es-p10t es-p5b es-p20r es-p20l es-m-txt-l"
                                                      bgcolor="transparent"
                                                      align="left"
                                                    >
                                                      <h3 style="color: #2980d9;">
                                                        Dear Intrepid Data Analyst,
                                                      </h3>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      class="esd-block-text es-p5t es-p20r es-p20l"
                                                      bgcolor="transparent"
                                                      align="left"
                                                    >
                                                      <p>
                                                        Please click the&nbsp;link below
                                                        to verify your email address and
                                                        finish creating your account
                                                      </p>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      class="esd-structure es-p20t es-p20r es-p20l"
                                      style="background-color: #ffffff;"
                                      bgcolor="#ffffff"
                                      align="left"
                                    >
                                      <table
                                        cellspacing="0"
                                        cellpadding="0"
                                        width="100%"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              class="esd-container-frame"
                                              width="560"
                                              align="left"
                                            >
                                              <table
                                                width="100%"
                                                cellspacing="0"
                                                cellpadding="0"
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      class="esd-block-button es-p10"
                                                      align="center"
                                                    >
                                                      <span class="es-button-border"
                                                        ><a
                                                          href="${confirmationUrl}"
                                                          class="es-button"
                                                          target="_blank"
                                                          style="
                                                            border-width: 10px 99px;
                                                          "
                                                          >Confirm</a
                                                        ></span
                                                      >
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      class="esd-structure"
                                      style="background-position: center bottom;"
                                      align="left"
                                    >
                                      <table
                                        width="100%"
                                        cellspacing="0"
                                        cellpadding="0"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              class="esd-container-frame"
                                              width="600"
                                              valign="top"
                                              align="center"
                                            >
                                              <table
                                                style="
                                                  background-position: center bottom;
                                                  background-color: #ffffff;
                                                  border-radius: 0px 0px 5px 5px;
                                                  border-collapse: separate;
                                                "
                                                width="100%"
                                                cellspacing="0"
                                                cellpadding="0"
                                                bgcolor="#ffffff"
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      class="esd-block-text es-p5t es-p20r es-p20l"
                                                      bgcolor="transparent"
                                                      align="left"
                                                    >
                                                      <p>
                                                        Cheers,<br />The Media Analytics
                                                        Team
                                                      </p>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      class="esd-block-spacer"
                                                      height="32"
                                                      align="center"
                                                    ></td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </body>
        </html>
        `,
      });
    });
  },
};
