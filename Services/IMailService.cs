using System.Net.Mail;
using System.Threading.Tasks;
using MimeKit;
using SSIS.Models;

namespace SSIS.Services
{
    public interface IMailService
    {
        MimeMessage CreateMessage(MailRequest message);

        Task<string> sendEmailAsync(MimeMessage mimeMessage, MailSettings _mailSettings);
    }
}