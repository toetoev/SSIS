using System.Threading.Tasks;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Text;
using SSIS.Models;

namespace SSIS.Services
{
    public class MailService : IMailService
    {
        public MimeMessage CreateMessage(MailRequest message)
        {
            //create message
            var mimeMessage = new MimeMessage();
            mimeMessage.From.Add(message.Sender);
            mimeMessage.To.Add(message.Receiver);
            mimeMessage.Subject = message.Subject;
            mimeMessage.Body = new TextPart(MimeKit.Text.TextFormat.Text)
            {
                Text = message.Content
            };

            return mimeMessage;

        }

        public async Task<string> sendEmailAsync(MimeMessage mimeMessage, MailSettings _mailSettings)
        {

            using(SmtpClient smtpClient = new SmtpClient())
            {
                await smtpClient.ConnectAsync(_mailSettings.SmtpServer,
                    _mailSettings.Port, true);
                await smtpClient.AuthenticateAsync(_mailSettings.UserName,
                    _mailSettings.Password);
                await smtpClient.SendAsync(mimeMessage);
                await smtpClient.DisconnectAsync(true);
            }

            return "Email sent successfully";

        }
    }

}